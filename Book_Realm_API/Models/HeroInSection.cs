using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class HeroInSection
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("HomePageSection")]
        public Guid SectionId { get; set; }
        [JsonIgnore]
        public HomePageSection Section { get; set; }

        [ForeignKey("Hero")]
        public Guid HeroId { get; set; }
        [JsonIgnore]
        public Hero Hero { get; set; }
    }
}
