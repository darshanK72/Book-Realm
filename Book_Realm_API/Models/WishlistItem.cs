using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class WishlistItem
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        public Book? Book { get; set; }

        [ForeignKey("Wishlist")]
        public int WishlistId { get; set; }

        public Wishlist? Wishlist { get; set; }
    }
}
