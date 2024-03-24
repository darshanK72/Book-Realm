using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class BookTag
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [JsonIgnore]
        public Book Book { get; set; }

        [ForeignKey("Tag")]
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
