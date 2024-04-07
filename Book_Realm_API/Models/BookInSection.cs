using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class BookInSection
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("HomePageSection")]
        public Guid SectionId { get; set; }
        [JsonIgnore]
        public HomePageSection Section { get; set; }

        [ForeignKey("Book")]
        public Guid BookId { get; set; }
        [JsonIgnore]
        public Book Book { get; set; }
    }

}
