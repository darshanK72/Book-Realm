using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.WishlistRepository
{
    public interface IWishlistRepository
    { 
        Task<List<Wishlist>> GetAllWishlists();
        Task<Wishlist> GetWishlistById(Guid id);
        Task<Wishlist> CreateWishlist(Wishlist wishlist);
        Task<Wishlist> UpdateWishlist(Guid id, Wishlist wishlist);
        Task<Wishlist> DeleteWishlist(Guid id);
    }
}
