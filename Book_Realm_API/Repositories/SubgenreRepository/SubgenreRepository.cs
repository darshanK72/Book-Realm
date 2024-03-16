using Book_Realm_API.Models;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.SubgenreRepository
{
    public class SubgenreRepository : ISubgenreRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public SubgenreRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Subgenre>> GetAllSubgenres()
        {
            return await _dbContext.Subgenres.ToListAsync();
        }

        public async Task<Subgenre> GetSubgenreById(Guid id)
        {
            var subgenre = await _dbContext.Subgenres.FindAsync(id);

            if (subgenre == null)
            {
                throw new InvalidOperationException("Subgenre not found");
            }

            return subgenre;
        }

        public async Task<Subgenre> UpdateSubgenre(Guid id, Subgenre subgenre)
        {
            if (!SubgenreIdExists(id))
            {
                throw new InvalidOperationException("Subgenre not found");
            }
            _dbContext.Entry(subgenre).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return subgenre;
        }

        public async Task<Subgenre> CreateSubgenre(Subgenre subgenre)
        {
            _dbContext.Subgenres.Add(subgenre);
            await _dbContext.SaveChangesAsync();
            return subgenre;
        }

        public async Task<List<Subgenre>> CreateMultipleSubgenre(List<Subgenre> subgenres)
        {
            await _dbContext.Subgenres.AddRangeAsync(subgenres);
            await _dbContext.SaveChangesAsync();
            return subgenres;
        }

        public async Task<Subgenre> DeleteSubgenre(Guid id)
        {
            var subgenre = await _dbContext.Subgenres.FindAsync(id);
            if (subgenre == null)
            {
                throw new InvalidOperationException("Subgenre not found");
            }
            _dbContext.Subgenres.Remove(subgenre);
            await _dbContext.SaveChangesAsync();
            return subgenre;
        }

        private bool SubgenreIdExists(Guid id)
        {
            return _dbContext.Subgenres.Any(e => e.Id == id);
        }
    }
}
