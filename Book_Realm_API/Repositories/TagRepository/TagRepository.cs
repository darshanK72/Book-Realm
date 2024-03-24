using Azure;
using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Book_Realm_API.Repositories.TagRepository
{
    public class TagRepository : ITagRepository
    {
        private readonly BookRealmDbContext _dbContext;

        public TagRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<BookTag>> SaveAndGetBookTags(Guid bookId,List<string> tagNames)
        {
            List<BookTag> savedBookTags = new List<BookTag>();

            foreach (string tagName in tagNames)
            {
               
                Tag existingTag = await _dbContext.Tags.FirstOrDefaultAsync(t => t.Name == tagName);

                if (existingTag == null)
                {
                    Tag newTag = new Tag { Name = tagName };
                    _dbContext.Tags.Add(newTag);
                    await _dbContext.SaveChangesAsync();
                    BookTag newBookTag = new BookTag()
                    {
                        BookId = bookId,
                        Book = await _dbContext.Books.FindAsync(bookId),
                        TagId = newTag.Id,
                        Tag = newTag
                    };
                    _dbContext.BookTags.Add(newBookTag);
                    await _dbContext.SaveChangesAsync();
                    savedBookTags.Add(newBookTag);


                }
                else
                {
                    BookTag newBookTag = new BookTag()
                    {
                        BookId = bookId,
                        Book = await _dbContext.Books.FindAsync(bookId),
                        TagId = existingTag.Id,
                        Tag = existingTag
                    };
                    _dbContext.BookTags.Add(newBookTag);
                    await _dbContext.SaveChangesAsync();
                    savedBookTags.Add(newBookTag);

                }
            }

            return savedBookTags;
        }
    }
}
