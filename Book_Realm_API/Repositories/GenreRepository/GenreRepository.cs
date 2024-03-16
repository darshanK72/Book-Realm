using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.GenreRepository
{
    public class GenreRepository : IGenreRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public GenreRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Genre>> GetAllGenres()
        {
            return await _dbContext.Genres.ToListAsync();
        }

        public async Task<Genre> GetGenreById(Guid id)
        {
            var genre = await _dbContext.Genres.FindAsync(id);

            if (genre == null)
            {
                throw new InvalidOperationException("Genre not found");
            }

            return genre;
        }

        public async Task<Genre> CreateGenre(Genre genre)
        {
            await _dbContext.Genres.AddAsync(genre);
            await _dbContext.SaveChangesAsync();
            return genre;
        }


        public async Task<List<Genre>> CreateMultipleGenre(List<Genre> genres)
        {
            await _dbContext.Genres.AddRangeAsync(genres);
            await _dbContext.SaveChangesAsync();
            return genres;
        }

        public async Task<Genre> UpdateGenre(Guid id, Genre genre)
        {
            if (!GenreIdExists(id))
            {
                throw new InvalidOperationException("Genre not found");
            }
            _dbContext.Entry(genre).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return genre;
        }

        public async Task<Genre> DeleteGenre(Guid id)
        {
            var genre = await _dbContext.Genres.FindAsync(id);
            if (genre == null)
            {
                throw new InvalidOperationException("Genre not found");
            }
            _dbContext.Genres.Remove(genre);
            await _dbContext.SaveChangesAsync();
            return genre;
        }

        private bool GenreIdExists(Guid id)
        {
            return _dbContext.Genres.Any(e => e.Id == id);
        }
    }
}
