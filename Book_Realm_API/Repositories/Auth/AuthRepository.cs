using Book_Realm_API.Exceptions;
using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Utils.JwtHelper;
using Book_Realm_API.Utils.MappingHelper;
using Book_Realm_API.Utils.PasswordHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Book_Realm_API.Repositories.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IPasswordHelper _passwordHelper;
        private readonly IJwtHelper _jwtHelper;
        private readonly IMappingHelper _mapper;
        
        public AuthRepository(BookRealmDbContext dbContext,IPasswordHelper passwordHelper,IJwtHelper jwtHelper,IMappingHelper mapper)
        {
            this._dbContext = dbContext;
            this._passwordHelper = passwordHelper;
            this._jwtHelper = jwtHelper;
            this._mapper = mapper;
        }

        public async Task<SignInResponse> SignIn(SignInRequest signInRequest)
        {
            if (signInRequest.Email != null && signInRequest.Password != null)
            {
                var user = await _dbContext.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).SingleOrDefaultAsync(u => u.Email == signInRequest.Email);
                if (user != null)
                {
                    if (_passwordHelper.Decode(signInRequest.Password, user?.Password))
                    {
                        var siginInResponse = new SignInResponse()
                        {
                            AccessToken = _jwtHelper.CreateJWT(user),
                            RefreshToken = "",
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

        public async Task<SignUpResponse> SignUp(SignUpRequest signUpRequest)
        {
           if(signUpRequest != null)
           {
                var existingUser = await this._dbContext.Users.SingleOrDefaultAsync(u => u.Email == signUpRequest.Email);
                if(existingUser == null)
                {
                    var userRole = _dbContext.Roles.First(r => r.Name == "User");
                    var newUser = new User()
                    {
                        Name = signUpRequest.Name,
                        Email = signUpRequest.Email,
                        Mobile = signUpRequest.Mobile,
                        Password = _passwordHelper.Encode(signUpRequest.Password),
                        Reviews = new List<Review>(),
                        Orders = new List<Order>()
                    };

                    newUser.UserRoles = new List<UserRole>()
                    {
                        new UserRole()
                        {
                           Role = userRole,
                           RoleId = userRole.Id
                        }
                    };
                    await _dbContext.AddAsync(newUser);
                    await _dbContext.SaveChangesAsync();

                    var signUpResponse = new SignUpResponse()
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
    }
}
