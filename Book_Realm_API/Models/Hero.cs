using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class Hero
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string PlaceHolder { get; set; }
        public string ClickUrl { get; set; }

        [JsonIgnore]
        public List<HeroImage> HeroImages { get; set; }
    }
}
