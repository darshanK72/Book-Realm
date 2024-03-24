using Book_Realm_API.Models;

namespace Book_Realm_API.Repositories.TagRepository
{
    public interface ITagRepository
    {
        Task<List<BookTag>> SaveAndGetBookTags(Guid bookId,List<string> tagNames);
    }
}
