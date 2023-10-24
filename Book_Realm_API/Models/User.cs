using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.Net;

namespace Book_Realm_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
        public string Password { get; set; }
        public Address Address { get; set}
        public Cart Cart { get; set; }
        public Wishlist Wishlist { get; set; }
        public List<Order> OwnOrders { get; set; }
        public List<Review> OwnReviews { get; set; }
    }
}
