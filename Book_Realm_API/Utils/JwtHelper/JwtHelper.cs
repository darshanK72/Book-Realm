using Book_Realm_API.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Book_Realm_API.Utils.JwtHelper
{
    public class JwtHelper
    {
        private readonly IConfiguration _configuration;
        public JwtHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreateJWT(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var idenity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(JsonClaimValueTypes.Json,JsonConvert.SerializeObject(user))
            });


            var tokenDiscriptor = new SecurityTokenDescriptor()
            {
                Subject = idenity,
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
