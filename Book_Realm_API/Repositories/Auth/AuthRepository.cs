using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BookRealmDbContext dbContext;
        public AuthRepository(BookRealmDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<SignInResponse> SignIn(User user)
        {
            User existingUser = await dbContext.Users.FirstOrDefaultAsync((u) => u.Email == user.Email);
        }
    }
}
