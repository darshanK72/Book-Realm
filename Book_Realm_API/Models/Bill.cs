using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Bill
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public decimal SubTotal { get; set; }

        public decimal Discount { get; set; }

        public decimal Tax { get; set; }

        public decimal Shipping { get; set; }

        [Required]
        public decimal Total { get; set; }
    }
}
