using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.WishlistRepository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public WishlistRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Wishlist>> GetAllWishlists()
        {
            return await _dbContext.Wishlists.ToListAsync();
        }

        public async Task<Wishlist> GetWishlistById(Guid id)
        {
            var wishlist = await _dbContext.Wishlists.FindAsync(id);

            if (wishlist == null)
            {
                throw new InvalidOperationException("Wishlist not found");
            }

            return wishlist;
        }

        public async Task<Wishlist> CreateWishlist(Wishlist wishlist)
        {
            _dbContext.Wishlists.Add(wishlist);
            await _dbContext.SaveChangesAsync();
            return wishlist;
        }

        public async Task<Wishlist> UpdateWishlist(Guid id, Wishlist wishlist)
        {
            if (!WishlistIdExists(id))
            {
                throw new InvalidOperationException("Wishlist not found");
            }
            _dbContext.Entry(wishlist).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return wishlist;
        }

        public async Task<Wishlist> DeleteWishlist(Guid id)
        {
            var wishlist = await _dbContext.Wishlists.FindAsync(id);
            if (wishlist == null)
            {
                throw new InvalidOperationException("Wishlist not found");
            }
            _dbContext.Wishlists.Remove(wishlist);
            await _dbContext.SaveChangesAsync();
            return wishlist;
        }

        private bool WishlistIdExists(Guid id)
        {
            return _dbContext.Wishlists.Any(e => e.Id == id);
        }
    }
}
