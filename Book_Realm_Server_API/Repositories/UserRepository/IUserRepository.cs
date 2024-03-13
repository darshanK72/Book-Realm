using Book_Realm_Server_API.Models;

namespace Book_Realm_Server_API.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserById(Guid id);
        Task<User> UpdateUser(Guid id, User user);
        Task<User> DeleteUser(Guid id);
    }
}
