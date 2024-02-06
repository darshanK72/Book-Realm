using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories
{
    public interface IPublisherRepository
    {
        Task<IEnumerable<Publisher>> GetAllPublishersAsync();
        Task<Publisher> GetPublisherByIdAsync(int id);
        Task CreatePublisherAsync(Publisher publisher);
        Task UpdatePublisherAsync(int id, Publisher publisher);
        Task DeletePublisherAsync(int id);
    }
}
