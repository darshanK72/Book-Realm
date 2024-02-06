using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public AdminRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Admin>> GetAllAdminsAsync()
        {
            return await _dbContext.Admins.ToListAsync();
        }

        public async Task<Admin> GetAdminByIdAsync(int id)
        {
            return await _dbContext.Admins.FindAsync(id);
        }

        public async Task CreateAdminAsync(Admin admin)
        {
            if (admin == null)
            {
                throw new ArgumentNullException(nameof(admin));
            }

            await _dbContext.Admins.AddAsync(admin);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAdminAsync(int id, Admin admin)
        {
            if (id != admin.Id)
            {
                throw new ArgumentException("Admin ID mismatch");
            }

            _dbContext.Entry(admin).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
                {
                    throw new InvalidOperationException("Admin not found");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task DeleteAdminAsync(int id)
        {
            var admin = await _dbContext.Admins.FindAsync(id);
            if (admin == null)
            {
                throw new InvalidOperationException("Admin not found");
            }

            _dbContext.Admins.Remove(admin);
            await _dbContext.SaveChangesAsync();
        }

        private bool AdminExists(int id)
        {
            return _dbContext.Admins.Any(e => e.Id == id);
        }
    }
}
