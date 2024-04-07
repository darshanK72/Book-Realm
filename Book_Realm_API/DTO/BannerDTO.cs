using Book_Realm_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.DTO
{
    public class BannerDTO
    {
        public string Id { get;set; }
        public string PlaceHolder { get;set; }
        public string ClickUrl { get;set; }
        public string BannerType { get;set; }
        public string BannerImage { get;set; }

    }
}
