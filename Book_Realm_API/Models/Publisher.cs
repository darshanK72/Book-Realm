using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class Publisher : User
    {
      
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime FoundationDate { get; set; }

        public string WebsiteUrl { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<Book> PublishedBooks { get; set; }
    }
}
