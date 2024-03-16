using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.SubgenreRepository
{
    public interface ISubgenreRepository
    {
        Task<List<Subgenre>> GetAllSubgenres();
        Task<Subgenre> GetSubgenreById(Guid id);
        Task<Subgenre> UpdateSubgenre(Guid id, Subgenre subgenre);
        Task<Subgenre> CreateSubgenre(Subgenre subgenre);
        Task<List<Subgenre>> CreateMultipleSubgenre(List<Subgenre> subgenre);
        Task<Subgenre> DeleteSubgenre(Guid id);
    }
}
