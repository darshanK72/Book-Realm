using System;
using System.Collections.Generic;

namespace Book_Realm_API.DTO
{
    public class BookDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public float Rating { get; set; }
        public string Description { get; set; }
        public string PublishDate { get; set; }
        public decimal Price { get; set; }
        public float DiscountPercentage { get; set; }
        public int Pages { get; set; }
        public string BookFormat { get; set; }
        public string Language { get; set; }
        public string Country { get; set; }
        public string AuthorName { get; set; }
        public string GenreId { get; set; }
        public string SubgenreId { get; set; }
        public string AuthorId { get; set; }
        public string PublisherName { get; set; }
        public string PublisherId { get; set; }
        public List<string> Tags { get; set; } 
        public List<string> Reviews { get; set; } 
        public List<string> Images { get; set; } 
    }
}
