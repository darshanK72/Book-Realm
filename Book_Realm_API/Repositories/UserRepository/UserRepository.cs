using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Book_Realm_API.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public UserRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _dbContext.Users.Include(u => u.UserRoles).ThenInclude(uu => uu.Role).ToListAsync();
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _dbContext.Users.FindAsync(id);
        }

        public async Task<User> UpdateUser(Guid id, User user)
        {
            if(!UserIdExists(id))
            {
                throw new InvalidOperationException("User not found");
            }
            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> DeleteUser(Guid id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        private bool UserIdExists(Guid id)
        {
            return _dbContext.Users.Any(e => e.Id == id);
        }

        private bool UserEmailExists(string email)
        {
            return _dbContext.Users.Any(u => u.Email == email);
        }
    }
}
