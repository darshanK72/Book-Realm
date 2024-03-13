using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_Server_API.Models
{
    public class Admin : User
    {

       [Required]
       public string AdminDescription { get; set; }
    }
}
