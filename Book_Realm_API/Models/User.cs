using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Book_Realm_API.Models
{
    public class User 
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Password { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Role { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [ForeignKey("Address")]
        public int AddressId { get; set; }

        public Address? Address { get; set; }

        [ForeignKey("Cart")]
        public int CartId { get; set; }

        public Cart? Cart { get; set; }

        [ForeignKey("Wishlist")]
        public int WishlistId { get; set; }

        public Wishlist? Wishlist { get; set; }

        [NotMapped]
        public List<Review>? Reviews { get; set; }

        [NotMapped]
        public List<Order>? Orders { get; set; }
    }
}
