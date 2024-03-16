using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.CartRepository
{
    public class CartRepository : ICartRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public CartRepository(BookRealmDbContext context)
        {
            _dbContext = context;
        }

        public async Task<List<Cart>> GetAllCarts()
        {
            return await _dbContext.Carts.ToListAsync();
        }

        public async Task<Cart> GetCartById(Guid id)
        {
            var cart = await _dbContext.Carts.FindAsync(id);

            if (cart == null)
            {
                throw new InvalidOperationException("Cart not found");
            }

            return cart;
        }

        public async Task<Cart> CreateCart(Cart cart)
        {
            _dbContext.Carts.Add(cart);
            await _dbContext.SaveChangesAsync();
            return cart;
        }

        public async Task<Cart> UpdateCart(Guid id, Cart cart)
        {
            if (!CartIdExists(id))
            {
                throw new InvalidOperationException("Cart not found");
            }
            _dbContext.Entry(cart).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return cart;
        }

        public async Task<Cart> DeleteCart(Guid id)
        {
            var cart = await _dbContext.Carts.FindAsync(id);
            if (cart == null)
            {
                throw new InvalidOperationException("Cart not found");
            }
            _dbContext.Carts.Remove(cart);
            await _dbContext.SaveChangesAsync();
            return cart;
        }

        private bool CartIdExists(Guid id)
        {
            return _dbContext.Carts.Any(e => e.Id == id);
        }
    }
}
