using Book_Realm_API.Models;
using Book_Realm_API.Views;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Utils.MappingHelper
{
    public class MappingHelper : IMappingHelper
    {
        private readonly BookRealmDbContext _dbCoontext;

        public MappingHelper(BookRealmDbContext dbContext)
        {
            this._dbCoontext = dbContext;
        }
        public UserDTO MapToUserDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                UserRoles = user.UserRoles.Select(ur => ur.Role.Name).ToList(),
                Reviews = user.Reviews.Select(r => r.Id).ToList(),
                Orders = user.Orders.Select((o) => o.Id).ToList()
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
                UserRoles = userDto.UserRoles.Select((role) => _dbCoontext?.UserRoles.Include(ur => ur.Role).FirstOrDefault((ur) => ur.Role.Name == role)).ToList(),
                Reviews = userDto.Reviews.Select((reviewId) => _dbCoontext?.Reviews?.FirstOrDefault((r) => r.Id == reviewId)).ToList(),
                Orders = userDto.Orders.Select((orderId) => _dbCoontext.Orders.FirstOrDefault((o) => o.Id == orderId)).ToList()
            };
        }

    }
}
