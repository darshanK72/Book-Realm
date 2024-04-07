using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class Banner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string PlaceHolder { get; set; }
        public string ClickUrl { get; set; }
        public BannerType BannerType { get; set; }

        [JsonIgnore]
        public BannerImage BannerImage { get; set; }
    }

    public enum BannerType
    {
        SMALL,
        MEDIUM, 
        LARGE,
        Hero
    }
}
