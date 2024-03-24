using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace Book_Realm_API.Models
{
    public class ProfileImage : Image
    {
        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
