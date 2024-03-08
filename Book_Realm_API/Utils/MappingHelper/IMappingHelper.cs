using Book_Realm_API.Models;
using Book_Realm_API.Views;

namespace Book_Realm_API.Utils.MappingHelper
{
    public interface IMappingHelper
    {
        public UserDTO MapToUserDTO(User user);
        public User MapToUser(UserDTO userView);
    }

}
