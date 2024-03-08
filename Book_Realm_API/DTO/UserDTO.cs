using Book_Realm_API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Views
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> UserRoles { get; set; }
        public int AddressId { get; set; }
        public int CartId { get; set; }
        public int WishlistId { get; set; }
        public List<Guid> Reviews { get; set; }
        public List<Guid> Orders { get; set; }
    }
}
