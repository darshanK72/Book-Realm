using Book_Realm_API.Models;

namespace Book_Realm_API.DTO
{
    public class GenreDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Subgenres { get; set; }
    }
}
