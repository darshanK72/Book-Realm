using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string Comment { get; set; }

        [Range(0, 5)]
        public float Rating { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [JsonIgnore]
        public Book Book { get; set; }
    }
}
