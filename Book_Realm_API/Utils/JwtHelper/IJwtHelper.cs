using Book_Realm_API.Models;

namespace Book_Realm_API.Utils.JwtHelper
{
    public interface IJwtHelper
    {
        public string CreateJWT(User user);
    }
}
