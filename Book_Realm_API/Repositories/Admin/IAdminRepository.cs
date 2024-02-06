using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<Admin>> GetAllAdminsAsync();
        Task<Admin> GetAdminByIdAsync(int id);
        Task CreateAdminAsync(Admin admin);
        Task UpdateAdminAsync(int id, Admin admin);
        Task DeleteAdminAsync(int id);
    }
}
