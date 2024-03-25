using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.BannerRepository
{
    public class BannerRepository : IBannerRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public BannerRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Banner>> GetAllBanners()
        {
            return await _dbContext.Banners.ToListAsync();
        }

        public async Task<Banner> GetBannerById(Guid id)
        {
            var banner = await _dbContext.Banners.FindAsync(id);

            if (banner == null)
            {
                throw new InvalidOperationException("Banner not found");
            }

            return banner;
        }

        public async Task<Banner> UpdateBanner(Guid id, Banner banner)
        {
            if (!BannerIdExists(id))
            {
                throw new InvalidOperationException("Banner not found");
            }
            _dbContext.Entry(banner).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return banner;
        }

        public async Task<Banner> CreateBanner(Banner banner)
        {
            _dbContext.Banners.Add(banner);
            await _dbContext.SaveChangesAsync();
            return banner;
        }

        public async Task<Banner> DeleteBanner(Guid id)
        {
            var banner = await _dbContext.Banners.FindAsync(id);
            if (banner == null)
            {
                throw new InvalidOperationException("Banner not found");
            }
            _dbContext.Banners.Remove(banner);
            await _dbContext.SaveChangesAsync();
            return banner;
        }

        private bool BannerIdExists(Guid id)
        {
            return _dbContext.Banners.Any(e => e.Id == id);
        }
    }

}
