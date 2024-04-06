using Azure.Core;
using Book_Realm_API.Exceptions;
using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Utils.EmailHelper;
using Book_Realm_API.Utils.JwtHelper;
using Book_Realm_API.Utils.MappingHelper;
using Book_Realm_API.Utils.PasswordHelper;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;

namespace Book_Realm_API.Repositories.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IPasswordHelper _passwordHelper;
        private readonly IMappingHelper _mappingHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IEmailHelper _emailHelper;
        
        public AuthRepository(BookRealmDbContext dbContext,IPasswordHelper passwordHelper,ITokenHelper tokenHelper,IEmailHelper emailHelper,IMappingHelper mappingHelper)
        {
            _dbContext = dbContext;
            _passwordHelper = passwordHelper;
            _tokenHelper = tokenHelper;
            _emailHelper = emailHelper;
            _mappingHelper = mappingHelper;
        }

        public async Task<UserExistsResponse> CheckIfUserExists(GoogleUser user)
        {
            if(user != null)
            {
                var existingUser = await _dbContext.Users.Where(u => u.Email == user.Email).FirstOrDefaultAsync(); 
                if(existingUser != null)
                {
                    return new UserExistsResponse()
                    {
                        Exists = true,
                        Message = "User exists with this email Id"
                    };
                }
                else
                {
                    return new UserExistsResponse()
                    {
                        Exists = false,
                        Message = "User do not exists with this email Id"
                    };
                }
            }
            else
            {
                throw new AuthenticationException(400, "Invalid Credentials!");
            }
        }

        public async Task<SignInResponse> SignIn(SignInRequest signInRequest)
        {
            if (signInRequest.Email != null && signInRequest.Password != null)
            {
                var user = await _dbContext.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).Include(u => u.Cart).Include(u => u.Address).Include(u => u.Wishlist).SingleOrDefaultAsync(u => u.Email == signInRequest.Email);
                if (user != null)
                {
                    if (_passwordHelper.Decode(signInRequest.Password, user?.Password))
                    {
                        var accessToken = _tokenHelper.CreateAccessToken(user);
                        var refreshToken = _tokenHelper.CreateRefreshToken();

                        user.AccessToken = accessToken;
                        user.RefreshToken = refreshToken;
                        user.RefreshTokenExpiry = DateTime.Now.AddHours(2);
                        _dbContext.Entry(user).State = EntityState.Modified;
                        await _dbContext.SaveChangesAsync();

                        var siginInResponse = new SignInResponse()
                        {
                            User = _mappingHelper.MapToUserDTO(user),
                            AccessToken = accessToken,
                            RefreshToken = refreshToken,
                            Message = "Sign In Successful."
                        };
                        return siginInResponse;
                    }
                    else
                    {
                        throw new AuthenticationException(400, "Incorrect Password!");
                    }
                }
                else
                {
                    throw new AuthenticationException(404, "User Not Found!");
                }
            }
            else
            {
                throw new AuthenticationException(400, "Invalid Credentials!");
            }
        }

        public async Task<SignInResponse> SignInWithGoogle(GoogleUser googleUser)
        {
            if(googleUser != null)
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleUser.IdToken);

                var user = await _dbContext.Users.Include(ur => ur.UserRoles).ThenInclude(u => u.Role).Include(u => u.Cart).Include(u => u.Address).Include(u => u.Wishlist).FirstOrDefaultAsync(u => u.Email == payload.Email);
                if (user == null)
                {
                    throw new AuthenticationException(404, "User Not Found!,Try to Sign Up First");
                }

                var accessToken = _tokenHelper.CreateAccessToken(user);
                var refreshToken = _tokenHelper.CreateRefreshToken();

                user.AccessToken = accessToken;
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiry = DateTime.Now.AddHours(2);

                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();

                return new SignInResponse()
                {
                    User = _mappingHelper.MapToUserDTO(user),
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                    Message = "Sign In Successful."
                };
            }
            else { 
           
                throw new AuthenticationException(400, "Invalid ID token");
            }
        }

        public async Task<MessageResponse> SignUp(SignUpRequest signUpRequest)
        {
           if(signUpRequest != null)
           {
                var existingUser = await this._dbContext.Users.SingleOrDefaultAsync(u => u.Email == signUpRequest.Email);
                User newUser = null;
                if (existingUser == null)
                {
                    var userRole = _dbContext.Roles.FirstOrDefault(r => r.Name == signUpRequest.Role);
                    if(userRole != null)
                    {
                        if (userRole.Name == "User")
                        {
                            newUser = new User()
                            {
                                Name = signUpRequest.Name,
                                Email = signUpRequest.Email,
                                Mobile = signUpRequest.Mobile,
                                Password = _passwordHelper.Encode(signUpRequest.Password),
                                Cart = new Cart(),
                                Address = new Address(),
                                Wishlist = new Wishlist(),
                                Reviews = new List<Review>(),
                                Orders = new List<Order>()
                            };

                            newUser.UserRoles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                   Role = userRole,
                                   RoleId = userRole.Id,
                                }
                            };
                        }
                        else if (userRole.Name == "Author")
                        {
                            newUser = new Author()
                            {
                                Name = signUpRequest.Name,
                                Email = signUpRequest.Email,
                                Mobile = signUpRequest.Mobile,
                                Password = _passwordHelper.Encode(signUpRequest.Password),
                                AuthorDescription = signUpRequest.Description,
                                Cart = new Cart(),
                                Address = new Address(),
                                Wishlist = new Wishlist(),
                                Reviews = new List<Review>(),
                                Orders = new List<Order>(),
                                PublishedBooks = new List<Book>(),
                            };

                            var otherRole = _dbContext.Roles.First(r => r.Name == "User");

                            newUser.UserRoles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                   Role = userRole,
                                   RoleId = userRole.Id,
                                },
                                new UserRole()
                                {
                                    Role = otherRole,
                                    RoleId = otherRole.Id,
                                }
                            };

                        }
                        else if (userRole.Name == "Publisher")
                        {
                            newUser = new Publisher()
                            {
                                Name = signUpRequest.Name,
                                Email = signUpRequest.Email,
                                Mobile = signUpRequest.Mobile,
                                Password = _passwordHelper.Encode(signUpRequest.Password),
                                PublisherDescription = signUpRequest.Description,
                                FoundationDate = signUpRequest.FoundationDate,
                                WebsiteUrl = signUpRequest.WebsiteUrl,
                                Cart = new Cart(),
                                Address = new Address(),
                                Wishlist = new Wishlist(),
                                Reviews = new List<Review>(),
                                Orders = new List<Order>(),
                                PublishedBooks = new List<Book>(),
                            };

                            var otherRole = _dbContext.Roles.First(r => r.Name == "User");

                            newUser.UserRoles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                   Role = userRole,
                                   RoleId = userRole.Id,
                                },
                                new UserRole()
                                {
                                    Role = otherRole,
                                    RoleId = otherRole.Id,
                                }
                            };
                        }
                        else if (userRole.Name == "Admin")
                        {
                            newUser = new Admin()
                            {
                                Name = signUpRequest.Name,
                                Email = signUpRequest.Email,
                                Mobile = signUpRequest.Mobile,
                                Password = _passwordHelper.Encode(signUpRequest.Password),
                                AdminDescription = signUpRequest.Description,
                                Cart = new Cart(),
                                Address = new Address(),
                                Wishlist = new Wishlist(),
                                Reviews = new List<Review>(),
                                Orders = new List<Order>(),
                            };

                            var otherRole = _dbContext.Roles.First(r => r.Name == "User");

                            newUser.UserRoles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                   Role = userRole,
                                   RoleId = userRole.Id,
                                },
                                new UserRole()
                                {
                                    Role = otherRole,
                                    RoleId = otherRole.Id,
                                }
                            };
                        }
                    }
                    else
                    {
                        throw new AuthenticationException(404, "User role not found");
                    }

                   
                    await _dbContext.AddAsync(newUser);
                    await _dbContext.SaveChangesAsync();

                    var signUpResponse = new MessageResponse()
                    {
                        Message = "User Registered Successfully"
                    };

                    return signUpResponse;
                }
                else
                {
                    throw new AuthenticationException(400, "User with this email already exists!");
                }

            }
           else
           {
                throw new AuthenticationException(400, "Invalid Credentials!");
           }  
        }

        public async Task<SignInResponse> SignUpWithGoogle(GoogleUser googleUser)
        {
            if(googleUser != null)
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(googleUser.IdToken);

                var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);
                if (existingUser == null)
                {
                    var userRole = _dbContext.Roles.First(r => r.Name == "User");
                    var newUser = new User()
                    {
                        Name = payload.Name,
                        Email = payload.Email,
                        Mobile = "",
                        Password = "",
                        Cart = new Cart(),
                        Address = new Address(),
                        Wishlist = new Wishlist(),
                        Reviews = new List<Review>(),
                        Orders = new List<Order>(),

                    };

                    newUser.UserRoles = new List<UserRole>()
                    {
                        new UserRole()
                        {
                           Role = userRole,
                           RoleId = userRole.Id,
                        }
                    };

                    await _dbContext.Users.AddAsync(newUser);
                    await _dbContext.SaveChangesAsync();

                    var accessToken = _tokenHelper.CreateAccessToken(newUser);
                    var refreshToken = _tokenHelper.CreateRefreshToken();

                    newUser.AccessToken = accessToken;
                    newUser.RefreshToken = refreshToken;
                    newUser.RefreshTokenExpiry = DateTime.Now.AddHours(2);

                    _dbContext.Entry(newUser).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();

                    return new SignInResponse()
                    {
                        User = _mappingHelper.MapToUserDTO(newUser),
                        AccessToken = accessToken,
                        RefreshToken = refreshToken,
                        Message = "User Registered Successfully."
                    };

                }
                else
                {
                    throw new AuthenticationException(400, "User with this email already exists!");
                }
            }
            else { 
                throw new AuthenticationException(400, "Invalid ID token");
            }
        }

        public async Task<RefreshResponse> Refresh(RefreshRequest refreshRequest)
        {
            if(refreshRequest != null)
            {
                var principal = _tokenHelper.GetPrincipalFromExpiredToken(refreshRequest.AccessToken);
                var user = await _dbContext.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefaultAsync(u => u.Email == principal.Identity.Name);
                if(user == null)
                {
                   throw new AuthenticationException(404, "User Not Found!");
                }
                else if(user.RefreshToken != refreshRequest.RefreshToken || user.RefreshTokenExpiry <=  DateTime.Now)
                {
                    throw new AuthenticationException(401, "Refresh Token is Invalid, SignIn Again!");
                }
                else
                {
                    var accessToken = _tokenHelper.CreateAccessToken(user);
                    var refreshToken = _tokenHelper.CreateRefreshToken();

                    user.AccessToken = accessToken;
                    user.RefreshToken = refreshToken;
                    user.RefreshTokenExpiry = DateTime.Now.AddHours(2);
                    _dbContext.Entry(user).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();

                    var refreshResponse = new RefreshResponse()
                    {
                        AccessToken = _tokenHelper.CreateAccessToken(user),
                        RefreshToken = _tokenHelper.CreateRefreshToken(),
                        Message = "Token Refresh is Successful."
                    };
                    return refreshResponse;
                }
            }
            else
            {
               throw new AuthenticationException(400, "Invalid Credentials!");
            }

        }

        public async Task<MessageResponse> ResetPasswordEmail(EmailRequest passwordResetRequest)
        {
            if(passwordResetRequest != null && passwordResetRequest.Email != null)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == passwordResetRequest.Email);
                if(user != null)
                {
                    var token = _tokenHelper.CreatePasswordResetToken();
                    user.PasswordResetToken = token;
                    user.PasswordResetTokenExpiry = DateTime.Now.AddMinutes(10);

                    _dbContext.Entry(user).State = EntityState.Modified;
                    await _dbContext.SaveChangesAsync();

                    var email = new Email()
                    {
                        To = user.Email,
                        Subject = "Password Reset Link!",
                        Body = _emailHelper.CreateMailBody(user.Email, token)
                };

                    await _emailHelper.SendEmail(email);

                    return new MessageResponse()
                    {

                        Message = $"Password reset link is sent to your email. The link will be available for 10 minutes"
                    };

                }
                else
                {
                    throw new AuthenticationException(404, "User Not Found!");
                }
            }
            else
            {
                throw new AuthenticationException(400, "Invalid Credentials!");
            }
        }

        public async Task<MessageResponse> ResetPassword(PasswordResetRequest passwordResetReqest,string email,string token,DateTime time)
        {
            if(email != null && token != null)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
                if(user != null)
                {
                    if(user.PasswordResetToken == token && user.PasswordResetTokenExpiry >= time)
                    {
                      
                        user.Password = _passwordHelper.Encode(passwordResetReqest.Password);
                        _dbContext.Entry(user).State = EntityState.Modified;
                        await _dbContext.SaveChangesAsync();

                        return new MessageResponse()
                        {
                            Message = "Password reset is successfull, try to sign in with new password."
                        };
                    }
                    else
                    {
                        throw new AuthenticationException(401, "Password reset token is Invalid, Try Again!");
                    }
                }
                else
                {
                    throw new AuthenticationException(404, "User Not Found!");
                }
            }
            else
            {
                throw new AuthenticationException(400, "Invalid Credentials!");
            }

        }

    }

    public class GoogleUser
    { 
        public string Email { get; set; }
        public string IdToken { get; set; }
    }

}
