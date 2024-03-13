using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_Server_API.Models
{
    public class WishlistItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Wishlist")]
        public Guid WishlistId { get; set; }

        [JsonIgnore]
        public Wishlist Wishlist { get; set; }

        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [JsonIgnore]
        public Book Book { get; set; }

    }
}
