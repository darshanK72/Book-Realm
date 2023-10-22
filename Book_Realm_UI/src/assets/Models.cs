public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public DateTime Date { get; set; }
    public string Password { get; set; }
    public Address Address {get;set};
    public Cart Cart {get;set;}
    public Wishlist Wishlist {get;set;}
    public List<Order> OwnOrders {get;set;}
    public List<Review> OwnReviews { get; set; }
}

public class Address{
    public int Id {get;set;}
    public string Street1 {get;set;}
    public string Street2 {get;set}
    public string City {get;set}
    public string State {get;set;}
    public string Country {get;set}
    public string Pincode {get;set}
}

public class Cart{
    public int Id {get;set;}
    public List<CartItem> CartList { get; set; }
    public Bill Bill {get;set;}
}

public class CartItem{
    public int Id { get; set; }
    public Book Book { get; set; }
    public int Quantity { get; set; }
    public Cart Cart {get;set;}
}

public class Wishlist{
    public int Id {get;set;}
    public List<WishlistItem> CartList { get; set; }
}

public class WishlistItem
{
    public int Id { get; set; }
    public Book Book { get; set; }
    public Wishlist Wishlist {get;set;}
}

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; }
    public double Rating { get; set; }
    public string Description { get; set; }
    public DateTime PublishDate { get; set; }
    public List<string> Images { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public int Pages { get; set; }
    public string BookFormat { get; set; }
    public string Language { get; set; }
    public List<string> Tags { get; set; }

    public List<Review> Reviews { get; set; }

    public Author Author { get; set; }
    public Publisher Publisher { get; set; }
    public Gener Gener { get; set; }
    public Subgener Subgener { get; set; }
}

public class Review
{
    public int Id { get; set; }
    public string Comment { get; set; }
    public int Rating { get; set; }

    public User User { get; set; }
    public Book Book { get; set; }
}

public class Author : User
{
    public string Description { get; set; }
    public List<Book> Books { get; set; }
}

public class Publisher : User
{
    public string Description { get; set; }
    public DateTime FoundationDate { get; set; }
    public string WebsiteUrl { get; set; }
    public List<Book> Books { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public List<Gener> Geners { get; set; }
}

public class Gener
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Category Category {get;set;}
    public List<Subgener> Subgeners { get; set; }
}

public class Subgener
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Gener Gener {get;set;}
}

public class Order{
    public int Id {get;set;}
    public string Status {get;set;}
    public List<OrderItem> Orders {get;set}
    public Bill Bill {get;set;}
}

public class OrderItem{
    public int Id { get; set; }
    public Book Book { get; set; }
    public int Quantity { get; set; }
    public Order Order {get;set;}
}

public class Bill{
    public int Id {get;set;}
    public int SubTotal {get;set;}
    public int Discount {get;set;}
    public int Tax {get;set;}
    public int Shipping {get;set;}
    public int Total {get;set;}

}