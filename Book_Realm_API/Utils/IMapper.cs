using Book_Realm_API.Models;
using Book_Realm_API.Views;

namespace Book_Realm_API.Utils
{
    public interface IMapper
    {
        public UserDTO MapToUserView(User user);
        public User MapToUser(UserDTO userView);
    }

}
