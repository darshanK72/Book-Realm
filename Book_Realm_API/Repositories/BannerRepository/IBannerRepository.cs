using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.BannerRepository
{
    public interface IBannerRepository
    {
        Task<List<Banner>> GetAllBanners();
        Task<Banner> GetBannerById(Guid id);
        Task<Banner> UpdateBanner(Guid id, Banner banner);
        Task<Banner> CreateBanner(Banner banner);
        Task<Banner> DeleteBanner(Guid id);
    }
}
