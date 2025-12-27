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
            return await _dbContext.Banners.Include(b => b.BannerImage).ToListAsync();
        }

        public async Task<Banner> GetBannerById(Guid id)
        {
            var banner = await _dbContext.Banners.FirstOrDefaultAsync(b => b.Id == id);
            
            if (banner == null)
            {
                throw new InvalidOperationException("Banner not found");
            }

            banner.BannerImage = await _dbContext.BannerImages.Where(bi => bi.BannerId == id).FirstOrDefaultAsync();

            return banner;
        }

        public async Task<List<Banner>> GetAllBannersByIds(List<string> bannerIds)
        {
            var banners = await _dbContext.Banners.Where(b => bannerIds.Contains(b.Id.ToString())).ToListAsync();

            List<Banner> result = new List<Banner>();

            foreach (var banner in banners)
            {
                banner.BannerImage = await _dbContext.BannerImages.Where(bi => bi.BannerId == banner.Id).FirstOrDefaultAsync();
                result.Add(banner);
            }
            return result;
        }
        public async Task<Hero> GetHeroById(Guid id)
        {
            var hero = await _dbContext.Heros.FindAsync(id);
            hero.HeroImages = await _dbContext.HeroImages.Where(bi => bi.HeroId == id).ToListAsync();

            if (hero == null)
            {
                throw new InvalidOperationException("Hero not found");
            }

            return hero;
        }

        public async Task<BannerDTO> UpdateBanner(Guid id, BannerDTO bannerDto)
        {
            var banner = await _dbContext.Banners.Include(b => b.BannerImage).FirstOrDefaultAsync(b => b.Id == id);
            
            if (banner == null)
            {
                throw new InvalidOperationException("Banner not found");
            }

            banner.PlaceHolder = bannerDto.PlaceHolder;
            banner.ClickUrl = bannerDto.ClickUrl;
            banner.BannerType = (BannerType)Enum.Parse(typeof(BannerType), bannerDto.BannerType);

            if (banner.BannerImage != null)
            {
                if (banner.BannerImage.Src != bannerDto.BannerImage && !string.IsNullOrEmpty(bannerDto.BannerImage))
                {
                    // Re-upload to media server if the URL has changed
                    var imageUploadResult = await _imageRepository.UploadImageFromUrl(bannerDto.BannerImage, "Banner", bannerDto.PlaceHolder);
                    banner.BannerImage.Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString();
                }
                banner.BannerImage.Order = bannerDto.Order;
                banner.BannerImage.Name = bannerDto.PlaceHolder;
            }
            else if (!string.IsNullOrEmpty(bannerDto.BannerImage))
            {
                var imageUploadResult = await _imageRepository.UploadImageFromUrl(bannerDto.BannerImage, "Banner", bannerDto.PlaceHolder);
                var imgId = imageUploadResult.PublicId.Split('/').Last();
                var newImage = new BannerImage()
                {
                    Id = Guid.Parse(imgId),
                    Name = banner.PlaceHolder,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Banner",
                    Banner = banner,
                    Order = bannerDto.Order
                };
                _dbContext.BannerImages.Add(newImage);
                banner.BannerImage = newImage;
            }

            await _dbContext.SaveChangesAsync();
            return _mappingHelper.MapToBannerDTO(banner);
        }

        public async Task<BannerDTO> CreateBanner(BannerDTO bannerDto)
        {
            var banner = _mappingHelper.MapToBanner(bannerDto);

            if (!string.IsNullOrEmpty(bannerDto.BannerImage))
            {
                var imageUploadResult = await _imageRepository.UploadImageFromUrl(bannerDto.BannerImage, "Banner", bannerDto.PlaceHolder);
                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new BannerImage()
                {
                    Id = Guid.Parse(Id),
                    Name = banner.PlaceHolder,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Banner",
                    Banner = banner,
                    Order = bannerDto.Order
                };
                _dbContext.BannerImages.Add(image);
                banner.BannerImage = image;
            }

            _dbContext.Banners.Add(banner);
            await _dbContext.SaveChangesAsync();

            return _mappingHelper.MapToBannerDTO(banner);
        }

        public async Task<string> CreateHero(HeroDTO heroDto)
        {
            try
            {
                var hero = _mappingHelper.MapToHero(heroDto);
                _dbContext.Heros.Add(hero);
                await _dbContext.SaveChangesAsync();
                foreach (var item in heroDto.HeroImages)
                {
                    try
                    {
                        var imageUploadResult = await _imageRepository.UploadImageFromUrl(item, "Hero", heroDto.PlaceHolder);
                        var Id = imageUploadResult.PublicId.Split('/').Last();
                        var heroImage = new HeroImage()
                        {
                            Id = Guid.Parse(Id),
                            Name = hero.PlaceHolder,
                            Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                            Type = "Hero",
                            HeroId = hero.Id,
                            Hero = await GetHeroById(hero.Id)
                        };
                        var imageResult = await _imageRepository.CreateHeroImage(heroImage);
                    }
                    catch (Exception)
                    {
                        continue;
                    }
                }


                return "Hero created successfully";
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
