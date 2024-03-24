using Book_Realm_API.Models;
using Book_Realm_API.DTO;
using Microsoft.EntityFrameworkCore;
using Humanizer.Localisation;

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
                Id = user.Id.ToString(),
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                CartId = user.Cart.Id.ToString(),
                AddressId = user.Address.Id.ToString(),
                WishlistId = user.Wishlist.Id.ToString(),
                UserRoles = user.UserRoles != null ? user.UserRoles.Where(ur => ur.Role != null).Select(ur => ur.Role.Name).ToList() : new List<string>(),
                Reviews = user.Reviews != null ? user.Reviews.Select(r => r.Id.ToString()).ToList() : new List<string>(),
                Orders = user.Orders != null ? user.Orders.Select(o => o.Id.ToString()).ToList() : new List<string>(),

            };
        }

        public User MapToUser(UserDTO userDto)
        {
            return new User
            {
                Id = Guid.Parse(userDto.Id),
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                Cart = _dbContext.Carts.FirstOrDefault(c => c.Id == Guid.Parse(userDto.CartId)),
                Address = _dbContext.Addresses.FirstOrDefault(a => a.Id == Guid.Parse(userDto.AddressId)),
                Wishlist = _dbContext.Wishlists.FirstOrDefault(w => w.Id == Guid.Parse(userDto.WishlistId)),
                UserRoles = userDto.UserRoles.Select((role) => _dbContext.UserRoles.Include(ur => ur.Role).FirstOrDefault((ur) => ur.Role.Name == role)).ToList(),
                Reviews = userDto.Reviews.Select((reviewId) => _dbContext.Reviews.FirstOrDefault((r) => r.Id == Guid.Parse(reviewId))).ToList(),
                Orders = userDto.Orders.Select((orderId) => _dbContext.Orders.FirstOrDefault((o) => o.Id == Guid.Parse(orderId))).ToList()
            };
        }

        public CartDTO MapToCartDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id.ToString(),
                BillId = cart.Bill.Id.ToString(),
                UserId = cart.UserId.ToString(),
                CartItems = cart.CartItems.Select(ci => ci.Id.ToString()).ToList() ?? new List<string>()
            };
        }

        public Cart MapToCart(CartDTO cartDto)
        {
            return new Cart
            {
                Id = Guid.Parse(cartDto.Id),
                UserId = Guid.Parse(cartDto.UserId),
                Bill = _dbContext.Bills.FirstOrDefault(b => b.Id == Guid.Parse(cartDto.Id)),
                User = _dbContext.Users.FirstOrDefault(u => u.Id == Guid.Parse(cartDto.UserId)),
                CartItems = cartDto.CartItems.Select((cartItemId) => _dbContext.CartItems.FirstOrDefault(ci => ci.Id == Guid.Parse(cartItemId))).ToList()
            };
        }

        public OrderDTO MapToOrderDTO(Order order)
        {
            return new OrderDTO
            {
                Id = order.Id.ToString(),
                Status = order.Status,
                UserId = order.UserId.ToString(),
                BillId = order.Bill.Id.ToString(),
                OrderItems = order.OrderItems.Select(oi => oi.Id.ToString()).ToList() ?? new List<string>()
            };
        }

        public Order MapToOrder(OrderDTO orderDto)
        {
            return new Order
            {
                Id = Guid.Parse(orderDto.Id),
                Status = orderDto.Status,
                UserId = Guid.Parse(orderDto.UserId),
                User = _dbContext.Users.FirstOrDefault(u => u.Id == Guid.Parse(orderDto.UserId)),
                Bill = _dbContext.Bills.FirstOrDefault(b => b.Id == Guid.Parse(orderDto.BillId)),
                OrderItems = orderDto.OrderItems.Select(orderItemId => _dbContext.OrderItems.FirstOrDefault(oi => oi.Id == Guid.Parse(orderItemId))).ToList()
            };
        }

        public BillDTO MapToBillDTO(Bill bill)
        {
            return new BillDTO
            {
                Id = bill.Id.ToString(),
                SubTotal = bill.SubTotal,
                Discount = bill.Discount,
                Tax = bill.Tax,
                Shipping = bill.Shipping,
                Total = bill.Total,
                OrderId = bill.OrderId.ToString(),
                CartId = bill.CartId.ToString()
            };
        }

        public Bill MapToBill(BillDTO billDto)
        {
            return new Bill
            {
                Id = Guid.Parse(billDto.Id),
                SubTotal = billDto.SubTotal,
                Discount = billDto.Discount,
                Tax = billDto.Tax,
                Shipping = billDto.Shipping,
                Total = billDto.Total,
                OrderId = Guid.Parse(billDto.OrderId),
                CartId = Guid.Parse(billDto.CartId)
            };
        }

        public BookDTO MapToBookDTO(Book book)
        {
            return new BookDTO
            {
                Id = book.Id.ToString(),
                Title = book.Title,
                Rating = book.Rating,
                Description = book.Description,
                PublishDate = book.PublishDate.ToShortDateString(),
                Price = book.Price,
                DiscountPercentage = book.DiscountPercentage,
                Pages = book.Pages,
                BookFormat = book.BookFormat,
                Language = book.Language,
                Country = book.Country,
                AuthorName = book.AuthorName,
                AuthorId = book.AuthorId.ToString(),
                PublisherName = book.PublisherName,
                PublisherId = book.PublisherId.ToString(),
                GenreId = book.Genre.Id.ToString(),
                SubgenreId = book.Subgenre.Id.ToString(),
                Tags = book.Tags.Select(tag => tag.Id.ToString()).ToList(),
                Reviews = book.Reviews.Select(review => review.Id.ToString()).ToList(),
                Images = book.Images.Select(image => image.Id.ToString()).ToList()
            };
        }

        public Book MapToBook(BookDTO bookDto)
        {
            return new Book
            {
                Title = bookDto.Title,
                Rating = bookDto.Rating,
                Description = bookDto.Description,
                PublishDate = DateTime.Parse(bookDto.PublishDate),
                Price = bookDto.Price,
                DiscountPercentage = bookDto.DiscountPercentage,
                Pages = bookDto.Pages,
                BookFormat = bookDto.BookFormat,
                Language = bookDto.Language,
                Country = bookDto.Country,
                AuthorName = bookDto.AuthorName,
                AuthorId = Guid.Parse(bookDto.AuthorId),
                PublisherName = bookDto.PublisherName,
                PublisherId = Guid.Parse(bookDto.PublisherId),
                Genre = _dbContext.Genres.FirstOrDefault(g => g.Id == Guid.Parse(bookDto.GenreId)),
                Subgenre = _dbContext.Subgenres.FirstOrDefault(s => s.Id == Guid.Parse(bookDto.SubgenreId)),
                Tags = new List<BookTag>(),
                Reviews = new List<Review>(),
                Images = new List<BookImage>()
                //Tags = bookDto.Tags.Count() > 0  || bookDto.Tags != null ? bookDto.Tags.Select(tagId => _dbContext.BookTags.FirstOrDefault(tag => tag.Id == Guid.Parse(tagId))).ToList() : new List<BookTag>(),
                //Reviews = bookDto.Reviews.Count() > 0 || bookDto.Reviews != null ? bookDto.Reviews.Select(reviewId => _dbContext.Reviews.FirstOrDefault(review => review.Id == Guid.Parse(reviewId))).ToList() : new List<Review>(),
                //Images = bookDto.Images.Count() > 0 || bookDto.Images != null ? bookDto.Images.Select(imageId => _dbContext.BookImages.FirstOrDefault(image => image.Id == Guid.Parse(imageId))).ToList() : new List<BookImage>()
            };
        }

        public GenreDTO MapToGenreDTO(Genre genre)
        {
            return new GenreDTO()
            {
                Id = genre.Id.ToString(),
                Name = genre.Name,
                Description = genre.Description,
                Subgenres = genre.Subgenres.Select(s => s.Id.ToString()).ToList()
            };
        }

        public Genre MapToGenre(GenreDTO genreDto)
        {
            return new Genre()
            {
                Name = genreDto.Name,
                Description = genreDto.Description,
                Subgenres = genreDto.Subgenres.Count() > 0 || genreDto.Subgenres != null ? genreDto.Subgenres.Select(subgenreId => _dbContext.Subgenres.FirstOrDefault(subgenre => subgenre.Id == Guid.Parse(subgenreId))).ToList() : new List<Subgenre>()
            };
        }

        public SubgenreDTO MapToSubgenreDTO(Subgenre subgenre)
        {
            return new SubgenreDTO()
            {
                Id = subgenre.Id.ToString(),
                Name = subgenre.Name,
                Description = subgenre.Description,
                GenreId = subgenre.GenreId.ToString()
            };
        }

        public Subgenre MapToSubgenre(SubgenreDTO subgenreDto)
        {
            return new Subgenre()
            {
                Name = subgenreDto.Name,
                Description = subgenreDto.Description,
                GenreId = Guid.Parse(subgenreDto.GenreId)
            };
        }

        public AddressDTO MapToAddressDTO(Address address)
        {
            return new AddressDTO
            {
                Id = address.Id.ToString(),
                Street1 = address.Street1,
                Street2 = address.Street2,
                City = address.City,
                State = address.State,
                Country = address.Country,
                Pincode = address.Pincode,
                UserId = address.UserId.ToString()
            };
        }

        public Address MapToAddress(AddressDTO addressDto)
        {
            return new Address
            {
                Id = Guid.Parse(addressDto.Id),
                Street1 = addressDto.Street1,
                Street2 = addressDto.Street2,
                City = addressDto.City,
                State = addressDto.State,
                Country = addressDto.Country,
                Pincode = addressDto.Pincode,
                UserId = Guid.Parse(addressDto.UserId),
                User = _dbContext.Users.FirstOrDefault(u => u.Id == Guid.Parse(addressDto.UserId))
            };
        }

        public CartItemDTO MapToCartItemDTO(CartItem cartItem)
        {
            return new CartItemDTO
            {
                Id = cartItem.Id.ToString(),
                BookId = cartItem.BookId.ToString(),
                Quantity = cartItem.Quantity,
                CartId = cartItem.CartId.ToString()
            };
        }

        public CartItem MapToCartItem(CartItemDTO cartItemDto)
        {
            return new CartItem
            {
                Id = Guid.Parse(cartItemDto.Id),
                BookId = Guid.Parse(cartItemDto.BookId),
                Quantity = cartItemDto.Quantity,
                CartId = Guid.Parse(cartItemDto.CartId),
                Book = _dbContext.Books.FirstOrDefault(book => book.Id == Guid.Parse(cartItemDto.BookId)),
                Cart = _dbContext.Carts.FirstOrDefault(cart => cart.Id == Guid.Parse(cartItemDto.CartId))
            };
        }

        public ImageDTO MapToImageDTO(Image image)
        {
            return new ImageDTO
            {
                Id = image.Id.ToString(),
                Name = image.Name,
                Src = image.Src,
                Type = image.Type
            };
        }

        public Image MapToImage(ImageDTO imageDto)
        {
            return new Image
            {
                Id = Guid.Parse(imageDto.Id),
                Name = imageDto.Name,
                Src = imageDto.Src,
                Type = imageDto.Type
            };
        }

        public OrderItemDTO MapToOrderItemDTO(OrderItem orderItem)
        {
            return new OrderItemDTO
            {
                Id = orderItem.Id.ToString(),
                BookId = orderItem.BookId.ToString(),
                Quantity = orderItem.Quantity,
                OrderId = orderItem.OrderId.ToString()
            };
        }

        public OrderItem MapToOrderItem(OrderItemDTO orderItemDto)
        {
            return new OrderItem
            {
                Id = Guid.Parse(orderItemDto.Id),
                BookId = Guid.Parse(orderItemDto.BookId),
                Quantity = orderItemDto.Quantity,
                OrderId = Guid.Parse(orderItemDto.OrderId),
                Book = _dbContext.Books.FirstOrDefault(book => book.Id == Guid.Parse(orderItemDto.BookId)),
                Order = _dbContext.Orders.FirstOrDefault(order => order.Id == Guid.Parse(orderItemDto.OrderId))
            };
        }

        public ReviewDTO MapToReviewDTO(Review review)
        {
            return new ReviewDTO
            {
                Id = review.Id.ToString(),
                Comment = review.Comment,
                Rating = review.Rating,
                Date = review.Date.ToString(),
                UserId = review.UserId.ToString(),
                BookId = review.BookId.ToString()
            };
        }

        public Review MapToReview(ReviewDTO reviewDto)
        {
            return new Review
            {
                Id = Guid.Parse(reviewDto.Id),
                Comment = reviewDto.Comment,
                Rating = reviewDto.Rating,
                Date = DateTime.Parse(reviewDto.Date),
                UserId = Guid.Parse(reviewDto.UserId),
                BookId = Guid.Parse(reviewDto.BookId),
                Book = _dbContext.Books.FirstOrDefault(book => book.Id == Guid.Parse(reviewDto.BookId)),
                User = _dbContext.Users.FirstOrDefault(user => user.Id == Guid.Parse(reviewDto.UserId))
            };
        }

        public WishlistDTO MapToWishlistDTO(Wishlist wishlist)
        {
            return new WishlistDTO
            {
                Id = wishlist.Id.ToString(),
                UserId = wishlist.UserId.ToString()
            };
        }

        public Wishlist MapToWishlist(WishlistDTO wishlistDto)
        {
            return new Wishlist
            {
                Id = Guid.Parse(wishlistDto.Id),
                UserId = Guid.Parse(wishlistDto.UserId),
                User = _dbContext.Users.FirstOrDefault(user => user.Id == Guid.Parse(wishlistDto.UserId))
            };
        }


        public WishlistItemDTO MapToWishlistItemDTO(WishlistItem wishlistItem)
        {
            return new WishlistItemDTO
            {
                Id = wishlistItem.Id.ToString(),
                WishlistId = wishlistItem.WishlistId.ToString(),
                BookId = wishlistItem.BookId.ToString()
            };
        }

        public WishlistItem MapToWishlistItem(WishlistItemDTO wishlistItemDto)
        {
            return new WishlistItem
            {
                Id = Guid.Parse(wishlistItemDto.Id),
                WishlistId = Guid.Parse(wishlistItemDto.WishlistId),
                BookId = Guid.Parse(wishlistItemDto.BookId),
                Book = _dbContext.Books.FirstOrDefault(book => book.Id == Guid.Parse(wishlistItemDto.BookId)),
                Wishlist = _dbContext.Wishlists.FirstOrDefault(order => order.Id == Guid.Parse(wishlistItemDto.WishlistId))
            };
        }


    }
}
