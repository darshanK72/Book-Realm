using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.RoleRepository
{
    public interface IRoleRepository
    {
        Task<List<Role>> GetAllRoles();
        Task<Role> GetRoleById(Guid id);
        Task<Role> UpdateRole(Guid id, Role role);
        Task<Role> CreateRole(Role role);
        Task<Role> DeleteRole(Guid id);
    }
}
