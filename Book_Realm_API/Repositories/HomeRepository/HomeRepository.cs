using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Repositories.TagRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.HomeRepository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IMappingHelper _mappingHelper;
        public HomeRepository(BookRealmDbContext dbContext,IMappingHelper mappingHelper)
        {
            _dbContext = dbContext;
            _mappingHelper = mappingHelper;
        }

        public async Task<List<HomePageSection>> GetAllHomePageSections()
        {
            var homePageSections = await _dbContext.HomePageSections.ToListAsync();

            foreach (var section in homePageSections)
            {
                section.BookSections = await _dbContext.BooksInSection.Include(bs => bs.Book).Where(bs => bs.SectionId == section.Id).ToListAsync();
                section.BannerSections = await _dbContext.BannersInSection.Include(bs => bs.Banner).Where(bs => bs.SectionId == section.Id).ToListAsync();
                section.HeroSections = await _dbContext.HeroInSections.Include(hs => hs.Hero).Where(hs => hs.SectionId == section.Id).ToListAsync();
            }

            return homePageSections;
        }
        public async Task<HomePageSection> GetHomePageSectionById(Guid id)
        {
            var section = await _dbContext.HomePageSections.Where(s => s.Id == id).Include(s => s.BookSections).Include(s => s.BannerSections).FirstOrDefaultAsync();

            if (section == null)
            {
                throw new InvalidOperationException("HomePageSection not found");
            }

            return section;
        }
        public async Task<HomePageSection> CreateHomePageSection(HomeSectionDTO sectionDto)
        {
            var section = _mappingHelper.MapToHomeSection(sectionDto);
            _dbContext.HomePageSections.Add(section);
            await _dbContext.SaveChangesAsync();

            List<BookInSection> bookInSections = new List<BookInSection>();
            
            foreach(var bookId in sectionDto.Books)
            {

                var newBookSection = new BookInSection()
                {
                    SectionId = section.Id,
                    Section = section,
                    BookId = Guid.Parse(bookId),
                    Book = await _dbContext.Books.Where(b => b.Id == Guid.Parse(bookId)).FirstOrDefaultAsync()
                };

                _dbContext.BooksInSection.Add(newBookSection);
                await _dbContext.SaveChangesAsync();

                bookInSections.Add(newBookSection);
            }

            List<BannerInSection> bannerInSections = new List<BannerInSection>();

            foreach (var bannerId in sectionDto.Banners)
            {
                var bnr = await _dbContext.Banners.Where(b => b.Id == Guid.Parse(bannerId)).FirstOrDefaultAsync();
                var newBannerSection = new BannerInSection()
                {
                    SectionId = section.Id,
                    Section = section,
                    BannerId = Guid.Parse(bannerId),
                    Banner = bnr
                };

                _dbContext.BannersInSection.Add(newBannerSection);
                await _dbContext.SaveChangesAsync();

                bannerInSections.Add(newBannerSection);
            }

            List<HeroInSection> heroInSections = new List<HeroInSection>();

            foreach (var heroId in sectionDto.Heros)
            {

                var newHeroSection = new HeroInSection()
                {
                    SectionId = section.Id,
                    Section = section,
                    HeroId = Guid.Parse(heroId),
                    Hero = await _dbContext.Heros.Where(b => b.Id == Guid.Parse(heroId)).FirstOrDefaultAsync()
                };

                _dbContext.HeroInSections.Add(newHeroSection);
                await _dbContext.SaveChangesAsync();

                heroInSections.Add(newHeroSection);
            }

            section.BannerSections = bannerInSections;
            section.BookSections = bookInSections;
            section.HeroSections = heroInSections;

            _dbContext.Entry(section).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return section;
        }

        public async Task<HomePageSection> UpdateHomePageSection(Guid id, HomeSectionDTO sectionDto)
        {
            if (!HomePageSectionIdExists(id))
            {
                throw new InvalidOperationException("HomePageSection not found");
            }
            var section = _mappingHelper.MapToHomeSection(sectionDto);
            _dbContext.Entry(section).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return section;
        }

        public async Task<HomePageSection> DeleteHomePageSection(Guid id)
        {
            var section = await _dbContext.HomePageSections.FindAsync(id);
            if (section == null)
            {
                throw new InvalidOperationException("HomePageSection not found");
            }
            _dbContext.HomePageSections.Remove(section);
            await _dbContext.SaveChangesAsync();
            return section;
        }

        private bool HomePageSectionIdExists(Guid id)
        {
            return _dbContext.HomePageSections.Any(e => e.Id == id);
        }


    }
}
