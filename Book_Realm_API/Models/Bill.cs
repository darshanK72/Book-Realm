using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class Bill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public float SubTotal { get; set; }

        public float Discount { get; set; }

        public float Tax { get; set; }

        public float Shipping { get; set; }

        public float Total { get; set; }

        [ForeignKey("order")]
        public Guid OrderId { get; set; }

        public Order Order { get; set; }

        [ForeignKey("cart")]
        public Guid CartId { get; set; }

        public Cart Cart { get; set; }


    }
}
