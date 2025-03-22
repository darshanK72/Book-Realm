using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.HeroRepository
{
    public class HeroRepository : IHeroRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IMappingHelper _mappingHelper;
        private readonly IImageRepository _imageRepository;
        public HeroRepository(BookRealmDbContext context, IMappingHelper mappingHelper, IImageRepository imageRepository)
        {
            _dbContext = context;
            _mappingHelper = mappingHelper;
            _imageRepository = imageRepository;
        }

        public async Task<List<Hero>> GetAllHeros()
        {
            var heros = await _dbContext.Heros.ToListAsync();

            List<Hero> result = new List<Hero>();
            foreach (var hero in heros)
            {
                hero.HeroImages = await _dbContext.HeroImages.Where(bi => bi.HeroId == hero.Id).ToListAsync();
                result.Add(hero);
            }
            return result;
        }

        public async Task<List<Hero>> GetAllHerosByIds(List<string> heroIds)
        {
            var heros = await _dbContext.Heros.Where(h => heroIds.Contains(h.Id.ToString())).ToListAsync();

            List<Hero> result = new List<Hero>();
            foreach (var hero in heros)
            {
                hero.HeroImages = await _dbContext.HeroImages.Where(bi => bi.HeroId == hero.Id).OrderBy(bi => bi.Order).ToListAsync();
                result.Add(hero);
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

        public async Task<Hero> UpdateHero(Guid id, Hero Hero)
        {
            if (!HeroIdExists(id))
            {
                throw new InvalidOperationException("Hero not found");
            }
            _dbContext.Entry(Hero).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return Hero;
        }

        public async Task<string> CreateHero(HeroDTO heroDto)
        {
            try
            {
                var hero = _mappingHelper.MapToHero(heroDto);
                _dbContext.Heros.Add(hero);
                await _dbContext.SaveChangesAsync();
                int order = 1;
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
                            Hero = await GetHeroById(hero.Id),
                            Order = order++
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

        public async Task<Hero> DeleteHero(Guid id)
        {
            var Hero = await _dbContext.Heros.FindAsync(id);
            if (Hero == null)
            {
                throw new InvalidOperationException("Hero not found");
            }
            _dbContext.Heros.Remove(Hero);
            await _dbContext.SaveChangesAsync();
            return Hero;
        }

        private bool HeroIdExists(Guid id)
        {
            return _dbContext.Heros.Any(e => e.Id == id);
        }
    }

}
