using Book_Realm_API.Models;
using Book_Realm_API.Views;

namespace Book_Realm_API.Utils.Mapper
{
    public class Mapper : IMapper
    {
        private readonly BookRealmDbContext _context;

        public Mapper(BookRealmDbContext context)
        {
            _context = context;
        }
        public UserDTO MapToUserView(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                BirthDate = user.BirthDate,
                AddressId = user.AddressId,
                CartId = user.CartId,
                WishlistId = user.WishlistId,
                Reviews = user.Reviews?.Select((review) => review.Id).ToList(),
                Orders = user.Orders?.Select((order) => order.Id).ToList()
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
                Role = userDto.Role,
                BirthDate = userDto.BirthDate,
                AddressId = userDto.AddressId,
                CartId = userDto.CartId,
                WishlistId = userDto.WishlistId,
                Reviews = userDto.Reviews.Select((reviewId) => _context.Reviews.FirstOrDefault((r) => r.Id == reviewId)).ToList(),
                Orders = userDto.Orders.Select((orderId) => _context.Orders.FirstOrDefault((o) => o.Id == orderId)).ToList()
            };
        }

    }
}
