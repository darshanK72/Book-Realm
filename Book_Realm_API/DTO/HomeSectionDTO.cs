using Book_Realm_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.DTO
{
    public class HomeSectionDTO
    {
         public string Id { get; set; }
        public string SectionName { get; set; }
        public string SectionType { get; set; }
        public List<string> Books { get; set; }
        public List<string> Banners { get; set; }
    }
}
