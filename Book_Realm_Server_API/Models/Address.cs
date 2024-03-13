using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Book_Realm_Server_API.Models
{
    public class Address
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Street1 { get; set; }

        public string Street2 { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Country { get; set; }

        public int Pincode { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}

