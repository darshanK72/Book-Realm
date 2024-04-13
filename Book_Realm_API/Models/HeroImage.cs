using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class HeroImage : Image
    {
        [ForeignKey("Hero")]
        public Guid HeroId { get; set; }

        [JsonIgnore]
        public Hero Hero { get; set; }
    }
}
