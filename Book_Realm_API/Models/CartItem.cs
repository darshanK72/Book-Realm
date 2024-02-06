using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        public Book? Book { get; set; }

        public int Quantity { get; set; }

        [ForeignKey("Cart")]
        public int CartId { get; set; }

        public Cart? Cart { get; set; }
    }
}
