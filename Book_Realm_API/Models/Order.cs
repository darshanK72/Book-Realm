using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public string? Status { get; set; }

        [NotMapped]
        public List<OrderItem>? Orders { get; set; }

        [ForeignKey("Bill")]
        public int BillId { get; set; }

        public Bill? Bill { get; set; }
    }
}
