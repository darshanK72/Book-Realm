using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Street1 { get; set; }
        public string? Street2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public int Pincode { get; set; }
    }
}

