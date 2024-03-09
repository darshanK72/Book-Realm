using Book_Realm_API.Models;
using Book_Realm_API.DTO;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Utils.MappingHelper
{
    public class MappingHelper : IMappingHelper
    {
        private readonly BookRealmDbContext _dbContext;

        public MappingHelper(BookRealmDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public UserDTO MapToUserDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                CartId = user.Cart.Id,
                AddressId = user.Address.Id,
                WishlistId = user.Wishlist.Id,
                UserRoles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                Reviews = user.Reviews.Select(r => r.Id).ToList() ?? new List<Guid>(),
                Orders = user.Orders.Select(o => o.Id).ToList() ?? new List<Guid>(),
            };
        }

        public User MapToUser(UserDTO userDto)
        {
            return new User
            {
                Id = userDto.Id,
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                Cart = _dbContext.Carts.FirstOrDefault(c => c.Id == userDto.CartId),
                Address = _dbContext.Addresses.FirstOrDefault(a => a.Id == userDto.AddressId),
                Wishlist = _dbContext.Wishlists.FirstOrDefault(w => w.Id == userDto.WishlistId),
                UserRoles = userDto.UserRoles.Select((role) => _dbContext.UserRoles.Include(ur => ur.Role).FirstOrDefault((ur) => ur.Role.Name == role)).ToList(),
                Reviews = userDto.Reviews.Select((reviewId) => _dbContext.Reviews.FirstOrDefault((r) => r.Id == reviewId)).ToList(),
                Orders = userDto.Orders.Select((orderId) => _dbContext.Orders.FirstOrDefault((o) => o.Id == orderId)).ToList()
            };
        }

        public CartDTO MapToCartDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                BillId = cart.Bill.Id,
                UserId = cart.UserId,
                CartItems = cart.CartItems.Select(ci => ci.Id).ToList() ?? new List<Guid>()
            };
        }

        public Cart MapToCart(CartDTO cartDto)
        {
            return new Cart
            {
                Id = cartDto.Id,
                UserId = cartDto.UserId,
                Bill = _dbContext.Bills.FirstOrDefault(b => b.Id == cartDto.Id),
                User = _dbContext.Users.FirstOrDefault(u => u.Id == cartDto.UserId),
                CartItems = cartDto.CartItems.Select((cartItemId) => _dbContext.CartItems.FirstOrDefault(ci => ci.Id == cartItemId)).ToList()
            };
        }

        public OrderDTO MapToOrderDTO(Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                Status = order.Status,
                UserId = order.UserId,
                BillId = order.Bill.Id,
                OrderItems = order.OrderItems.Select(oi => oi.Id).ToList() ?? new List<Guid>()
            };
        }

        public Order MapToOrder(OrderDTO orderDto)
        {
            return new Order
            {
                Id = orderDto.Id,
                Status = orderDto.Status,
                UserId = orderDto.UserId,
                User = _dbContext.Users.FirstOrDefault(u => u.Id == orderDto.UserId),
                Bill = _dbContext.Bills.FirstOrDefault(b => b.Id == orderDto.BillId),
                OrderItems = orderDto.OrderItems.Select(orderItemId => _dbContext.OrderItems.FirstOrDefault(oi => oi.Id == orderItemId)).ToList()
            };
        }

        public BillDTO MapToBillDTO(Bill bill)
        {
            return new BillDTO
            {
                Id = bill.Id,
                SubTotal = bill.SubTotal,
                Discount = bill.Discount,
                Tax = bill.Tax,
                Shipping = bill.Shipping,
                Total = bill.Total,
                OrderId = bill.OrderId,
                CartId = bill.CartId
            };
        }

        public Bill MapToBill(BillDTO billDto)
        {
            return new Bill
            {
                Id = billDto.Id,
                SubTotal = billDto.SubTotal,
                Discount = billDto.Discount,
                Tax = billDto.Tax,
                Shipping = billDto.Shipping,
                Total = billDto.Total,
                OrderId = billDto.OrderId,
                CartId = billDto.CartId
            };
        }

        public BookDTO MapToBookDTO(Book book)
        {
            return new BookDTO
            {
                Id = book.Id,
                Title = book.Title,
                Rating = book.Rating,
                Description = book.Description,
                PublishDate = book.PublishDate,
                Price = book.Price,
                DiscountPercentage = book.DiscountPercentage,
                Pages = book.Pages,
                BookFormat = book.BookFormat,
                Language = book.Language,
                AuthorName = book.AuthorName,
                AuthorId = book.AuthorId,
                PublisherName = book.PublisherName,
                PublisherId = book.PublisherId,
                Tags = book.Tags,
                Reviews = book.Reviews.Select(review => review.Id).ToList(),
                Images = book.Images.Select(image => image.Id).ToList()
            };
        }

        public Book MapToBook(BookDTO bookDto)
        {
            return new Book
            {
                Id = bookDto.Id,
                Title = bookDto.Title,
                Rating = bookDto.Rating,
                Description = bookDto.Description,
                PublishDate = bookDto.PublishDate,
                Price = bookDto.Price,
                DiscountPercentage = bookDto.DiscountPercentage,
                Pages = bookDto.Pages,
                BookFormat = bookDto.BookFormat,
                Language = bookDto.Language,
                AuthorName = bookDto.AuthorName,
                AuthorId = bookDto.AuthorId,
                PublisherName = bookDto.PublisherName,
                PublisherId = bookDto.PublisherId,
                Tags = bookDto.Tags,
                Reviews = bookDto.Reviews.Select(reviewId => _dbContext.Reviews.FirstOrDefault(review => review.Id == reviewId)).ToList(),
                Images = bookDto.Images.Select(imageId => _dbContext.Images.FirstOrDefault(image => image.Id == imageId)).ToList()
            };
        }
    }
}
