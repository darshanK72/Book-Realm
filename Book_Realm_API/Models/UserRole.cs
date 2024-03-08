using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class UserRole
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("user")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [ForeignKey("role")]
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
    }
}
