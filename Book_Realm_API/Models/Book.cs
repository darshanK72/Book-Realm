using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Book_Realm_API.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Range(0, 5)]
        public int Rating { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public DateTime PublishDate { get; set; }

        [NotMapped]
        public List<Image> Images { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Range(0, 100)]
        public int DiscountPercentage { get; set; }

        public int Pages { get; set; }

        public string BookFormat { get; set; }

        public string Language { get; set; }

        [NotMapped]
        public List<string> Tags { get; set; }

        [NotMapped]
        [JsonIgnore]
        public List<Review> Reviews { get; set; }

        [Required]
        [MaxLength(100)]
        public string AuthorName { get; set; }


        [ForeignKey("author")]
        public Guid AuthorId { get; set; }

        [JsonIgnore]
        public Author Author { get; set; }

        [Required]
        [MaxLength(100)]
        public string PublisherName { get; set; }

        [ForeignKey("publisher")]
        public Guid PublisherId { get; set; }

        [JsonIgnore]
        public Publisher Publisher { get; set; }

        [JsonIgnore]
        public Genre Genre { get; set; }

        [JsonIgnore]
        public Subgenre Subgenre { get; set; }
    }
}
