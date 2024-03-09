using Book_Realm_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.RoleRepository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public RoleRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Role>> GetAllRoles()
        {
            return await _dbContext.Roles.ToListAsync();
        }

        public async Task<Role> GetRoleById(Guid id)
        {
            var role = await _dbContext.Roles.FindAsync(id);

            if (role == null)
            {
                throw new InvalidOperationException("Role not found");
            }

            return role;
        }

        public async Task<Role> UpdateRole(Guid id, Role role)
        {
            if (!RoleIdExists(id))
            {
                throw new InvalidOperationException("Role not found");
            }
            _dbContext.Entry(role).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return role;
        }

        public async Task<Role> CreateRole(Role role)
        {
            if (RoleNameExists(role.Name))
            {
                throw new InvalidOperationException("Role already exists");
            }
            _dbContext.Roles.Add(role);
            await _dbContext.SaveChangesAsync();
            return role;
        }

        public async Task<Role> DeleteRole(Guid id)
        {
            var role = await _dbContext.Roles.FindAsync(id);
            if (role == null)
            {
                throw new InvalidOperationException("Role not found");
            }
            _dbContext.Roles.Remove(role);
            await _dbContext.SaveChangesAsync();
            return role;
        }

        private bool RoleIdExists(Guid id)
        {
            return _dbContext.Roles.Any(e => e.Id == id);
        }

        private bool RoleNameExists(string name)
        {
            return _dbContext.Roles.Any(r => r.Name == name);
        }
    }
}
