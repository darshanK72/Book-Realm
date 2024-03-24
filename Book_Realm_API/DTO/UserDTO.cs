using Book_Realm_API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.DTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> UserRoles { get; set; }
        public string AddressId { get; set; }

        public string ProfileImage { get; set; }
        public string CartId { get; set; }
        public string WishlistId { get; set; }
        public List<string> Reviews { get; set; }
        public List<string> Orders { get; set; }
    }
}
