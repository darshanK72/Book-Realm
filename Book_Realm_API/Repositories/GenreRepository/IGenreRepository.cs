using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Payloads;

namespace Book_Realm_API.Repositories.GenreRepository
{
    public interface IGenreRepository
    {
        Task<List<Genre>> GetAllGenres();
        Task<Genre> GetGenreById(Guid id);
        Task<Genre> GetGenreByName(GetGenreRequest getGenreRequest);
        Task<Genre> CreateGenre(Genre genre);
        Task<List<Genre>> CreateMultipleGenre(List<Genre> genres);
        Task<Genre> UpdateGenre(Guid id, Genre genre);
        Task<Genre> DeleteGenre(Guid id);
    }
}
