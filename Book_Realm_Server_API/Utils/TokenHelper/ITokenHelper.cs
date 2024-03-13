using Book_Realm_Server_API.Models;
using System.Security.Claims;

namespace Book_Realm_Server_API.Utils.JwtHelper
{
    public interface ITokenHelper
    {
        public string CreateAccessToken(User user);
        public string CreateRefreshToken();
        public string CreatePasswordResetToken();
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken);
    }
}
