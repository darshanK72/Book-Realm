using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Src { get; set; }

        [Required]
        public string? Type { get; set; }
    }
}
