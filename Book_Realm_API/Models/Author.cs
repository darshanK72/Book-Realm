using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Book_Realm_API.Models
{
    public class Author : User
    {

        [MaxLength(500)]
        public string? Description { get; set; }

        [NotMapped]
        public List<Book>? PublishedBooks { get; set; }
    }
}
