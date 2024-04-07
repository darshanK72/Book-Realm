using Book_Realm_API.DTO;
using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.HomeRepository
{
    public interface IHomeRepository
    {
        Task<List<HomePageSection>> GetAllHomePageSections();
        Task<HomePageSection> GetHomePageSectionById(Guid id);
        Task<HomePageSection> CreateHomePageSection(HomeSectionDTO sectionDto);
        Task<HomePageSection> UpdateHomePageSection(Guid id, HomeSectionDTO sectionDto);
        Task<HomePageSection> DeleteHomePageSection(Guid id);
    }
}
