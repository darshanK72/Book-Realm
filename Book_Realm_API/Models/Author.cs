using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class Author : User
    {

        [MaxLength(500)]
        public string AuthorDescription { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<Book> PublishedBooks { get; set; }

    }
}
