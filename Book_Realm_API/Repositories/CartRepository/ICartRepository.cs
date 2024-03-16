using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.CartRepository
{
    public interface ICartRepository
    {
        Task<List<Cart>> GetAllCarts();
        Task<Cart> GetCartById(Guid id);
        Task<Cart> CreateCart(Cart cart);
        Task<Cart> UpdateCart(Guid id, Cart cart);
        Task<Cart> DeleteCart(Guid id);
    }
}
