using Book_Realm_API.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Book_Realm_API.Utils.JwtHelper
{
    public class JwtHelper : IJwtHelper
    {
        private readonly IConfiguration _configuration;
        public JwtHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreateJWT(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var roleClaims = new List<Claim>();

            var identityClaims = new ClaimsIdentity();
            identityClaims.AddClaim(new Claim("Id", user.Id.ToString()));
            identityClaims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            identityClaims.AddClaim(new Claim(JsonClaimValueTypes.Json, JsonConvert.SerializeObject(user)));
            foreach (var role in user.UserRoles)
            {
                identityClaims.AddClaim(new Claim(ClaimTypes.Role, role.Role.Name));
            }



            var tokenDiscriptor = new SecurityTokenDescriptor()
            {
                Subject = identityClaims,
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = credentials,
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };


            var token = jwtTokenHandler.CreateToken(tokenDiscriptor);

            return jwtTokenHandler.WriteToken(token);
        }
    }
}
