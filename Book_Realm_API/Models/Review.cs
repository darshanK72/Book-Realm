using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Book_Realm_API.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        public string? Comment { get; set; }

        [Range(0, 5)]
        public int Rating { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

        public Book? Book { get; set; }
    }
}
