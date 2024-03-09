using Book_Realm_API.Models;

namespace Book_Realm_API.Utils.JwtHelper
{
    public interface ITokenHelper
    {
        public string CreateAccessToken(User user);
        public string CreateRefreshToken(User user);
    }
}
