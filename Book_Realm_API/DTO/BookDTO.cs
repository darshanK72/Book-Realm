using System;
using System.Collections.Generic;

namespace Book_Realm_API.DTO
{
    public class BookDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public DateTime PublishDate { get; set; }
        public decimal Price { get; set; }
        public int DiscountPercentage { get; set; }
        public int Pages { get; set; }
        public string BookFormat { get; set; }
        public string Language { get; set; }
        public string AuthorName { get; set; }
        public Guid AuthorId { get; set; }
        public string PublisherName { get; set; }
        public Guid PublisherId { get; set; }
        public List<string> Tags { get; set; } 
        public List<Guid> Reviews { get; set; } 
        public List<Guid> Images { get; set; } 
    }
}
