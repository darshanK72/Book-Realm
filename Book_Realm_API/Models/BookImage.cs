using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class BookImage : Image
    {
        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [JsonIgnore]
        public Book Book { get; set; }
    }
}
