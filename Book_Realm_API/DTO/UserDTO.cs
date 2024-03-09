using Book_Realm_API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> UserRoles { get; set; }
        public Guid AddressId { get; set; }
        public Guid CartId { get; set; }
        public Guid WishlistId { get; set; }
        public List<Guid> Reviews { get; set; }
        public List<Guid> Orders { get; set; }
    }
}
