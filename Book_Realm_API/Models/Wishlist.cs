using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Wishlist
    {

        [Key]
        public int Id { get; set; }

        [NotMapped]
        public List<WishlistItem>? WishlistBookList { get; set; }
    }
}
