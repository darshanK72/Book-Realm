using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(Guid id);
        Task CreateUserAsync(User user);
        Task UpdateUserAsync(Guid id, User user);
        Task DeleteUserAsync(Guid id);
    }
}
