using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [NotMapped]
        public List<CartItem>? CartBookList { get; set; }

        [ForeignKey("Bill")]
        public int BillId { get; set; }

        public Bill? Bill { get; set; }
    }
}
