using Book_Realm_API.DTO;
using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.BannerRepository
{
    public interface IBannerRepository
    {
        Task<List<Banner>> GetAllBanners();
        Task<Banner> GetBannerById(Guid id);
        Task<List<Banner>> GetAllBannersByIds(List<string> bannerIds);
        Task<BannerDTO> UpdateBanner(Guid id, BannerDTO banner);
        Task<BannerDTO> CreateBanner(BannerDTO banner);
        Task<Banner> DeleteBanner(Guid id);
    }
}
