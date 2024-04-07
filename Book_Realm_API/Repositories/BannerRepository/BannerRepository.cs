using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.BannerRepository
{
    public class BannerRepository : IBannerRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IMappingHelper _mappingHelper;
        private readonly IImageRepository _imageRepository;
        public BannerRepository(BookRealmDbContext context,IMappingHelper mappingHelper,IImageRepository imageRepository)
        {
            _dbContext = context;
            _mappingHelper = mappingHelper;
            _imageRepository = imageRepository;
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

        public async Task<string> CreateBanner(BannerDTO bannerDto)
        {
            try
            {
                var banner = _mappingHelper.MapToBanner(bannerDto);
                _dbContext.Banners.Add(banner);
                await _dbContext.SaveChangesAsync();

                var imageUploadResult = await _imageRepository.UploadImageFromUrl(bannerDto.BannerImage, "Banner", bannerDto.PlaceHolder);
                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new BannerImage()
                {
                    Id = Guid.Parse(Id),
                    Name = banner.PlaceHolder,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Banner",
                    BannerId = banner.Id,
                    Banner = await GetBannerById(banner.Id)
                };
                var imageResult = await _imageRepository.CreateBannerImage(image);


                return "Banner created successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
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
