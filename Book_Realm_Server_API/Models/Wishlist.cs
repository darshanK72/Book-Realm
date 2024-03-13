using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_Server_API.Models
{
    public class Wishlist
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<WishlistItem> WishlistItems { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
