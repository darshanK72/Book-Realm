using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class HomePageSection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string SectionName { get; set; }

        [Required]
        public string SectionType { get; set; }

        [JsonIgnore]
        public List<BookInSection> BookSections { get; set; }

        [JsonIgnore]
        public List<BannerInSection> BannerSections { get; set; }

        [JsonIgnore]
        public List<HeroInSection> HeroSections { get; set; }
    }
}
