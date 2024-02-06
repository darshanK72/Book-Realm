using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories
{
    public class PublisherRepository : IPublisherRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public PublisherRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Publisher>> GetAllPublishersAsync()
        {
            return await _dbContext.Publishers.ToListAsync();
        }

        public async Task<Publisher> GetPublisherByIdAsync(int id)
        {
            return await _dbContext.Publishers.FindAsync(id);
        }

        public async Task CreatePublisherAsync(Publisher publisher)
        {
            if (publisher == null)
            {
                throw new ArgumentNullException(nameof(publisher));
            }

            await _dbContext.Publishers.AddAsync(publisher);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePublisherAsync(int id, Publisher publisher)
        {
            if (id != publisher.Id)
            {
                throw new ArgumentException("Publisher ID mismatch");
            }

            _dbContext.Entry(publisher).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
                {
                    throw new InvalidOperationException("Publisher not found");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task DeletePublisherAsync(int id)
        {
            var publisher = await _dbContext.Publishers.FindAsync(id);
            if (publisher == null)
            {
                throw new InvalidOperationException("Publisher not found");
            }

            _dbContext.Publishers.Remove(publisher);
            await _dbContext.SaveChangesAsync();
        }

        private bool PublisherExists(int id)
        {
            return _dbContext.Publishers.Any(e => e.Id == id);
        }
    }
}
