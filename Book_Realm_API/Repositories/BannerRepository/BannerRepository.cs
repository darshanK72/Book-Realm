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
            banner.BannerImage = await _dbContext.BannerImages.Where(bi => bi.BannerId == id).FirstOrDefaultAsync();

            if (banner == null)
            {
                throw new InvalidOperationException("Banner not found");
            }

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
                    Banner = await GetBannerById(banner.Id),
                    Order = bannerDto.Order
                };
                var imageResult = await _imageRepository.CreateBannerImage(image);


                return "Banner created successfully";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
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
