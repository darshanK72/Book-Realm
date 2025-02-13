using Book_Realm_API.DTO;
using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.HeroRepository
{
    public interface IHeroRepository
    {
        Task<List<Hero>> GetAllHeros();
        Task<Hero> GetHeroById(Guid id);
        Task<List<Hero>> GetAllHerosByIds(List<string> heroIds);
        Task<Hero> UpdateHero(Guid id, Hero Hero);
        Task<string> CreateHero(HeroDTO Hero);
        Task<Hero> DeleteHero(Guid id);
    }
}
