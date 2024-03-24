using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class BannerImage : Image
    {
        [ForeignKey("Banner")]
        public Guid BannerId { get; set; }

        [JsonIgnore]
        public Banner Banner { get; set; }

    }
}
