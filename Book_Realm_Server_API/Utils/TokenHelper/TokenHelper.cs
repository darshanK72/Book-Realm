using Book_Realm_Server_API.Models;
using Book_Realm_Server_API.Utils.MappingHelper;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Book_Realm_Server_API.Utils.JwtHelper
{
    public class TokenHelper : ITokenHelper
    {
        private readonly IConfiguration _configuration;
        private readonly RandomNumberGenerator _randomNumberGenerator;
        private readonly IMappingHelper _mappingHelper;
        public TokenHelper(IConfiguration configuration,IMappingHelper mappingHelper)
        {
            _configuration = configuration;
            _mappingHelper = mappingHelper;
            _randomNumberGenerator = RandomNumberGenerator.Create();
        }
        public string CreateAccessToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaim(new Claim("Id", user.Id.ToString()));
            identityClaims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            identityClaims.AddClaim(new Claim(ClaimTypes.Name, user.Email));
            identityClaims.AddClaim(new Claim(JsonClaimValueTypes.Json, JsonConvert.SerializeObject(_mappingHelper.MapToUserDTO(user))));
            foreach (var role in user.UserRoles)
            {
                identityClaims.AddClaim(new Claim(ClaimTypes.Role, role.Role.Name));
            }

            var tokenDiscriptor = new SecurityTokenDescriptor()
            {
                Subject = identityClaims,
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = credentials,
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };


            var token = jwtTokenHandler.CreateToken(tokenDiscriptor);

            return jwtTokenHandler.WriteToken(token);
        }

        public string CreateRefreshToken()
        {
            var randomNumber = new byte[64];
            _randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);

        }

        public string CreatePasswordResetToken()
        {
            var randomNumber = new byte[64];
            _randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"])),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = false
            };

            SecurityToken securityToken;
            ClaimsPrincipal principal = jwtTokenHandler.ValidateToken(accessToken, validationParameters, out securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if(jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("This token is invalid");
            }
            return principal;
        }
    }
}
