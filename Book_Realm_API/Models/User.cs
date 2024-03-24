using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class User 
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength (10)]
        [MinLength(10)]
        public string Mobile { get; set; }

        [Required]
        [MaxLength(100)]
        public string Password { get; set; }

        [Required]
        [JsonIgnore]
        public List<UserRole> UserRoles { get; set; }

        [JsonIgnore]
        public Address Address { get; set; }

        [JsonIgnore]
        public ProfileImage ProfileImage { get; set; }

        [JsonIgnore]
        public Cart Cart { get; set; }

        [JsonIgnore]
        public Wishlist Wishlist { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<Review> Reviews { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<Order> Orders { get; set; }

        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
        public string PasswordResetToken { get; set; }
        public DateTime PasswordResetTokenExpiry { get; set; }

    }
}
