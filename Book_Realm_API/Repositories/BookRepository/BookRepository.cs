using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Repositories.TagRepository;
using Book_Realm_API.Utils.MappingHelper;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Book_Realm_API.Repositories.BookRepository
{
    public class BookRepository : IBookRepository
    {
        private readonly BookRealmDbContext _dbContext;
        private readonly IMappingHelper _mappingHelper;
        private readonly ITagRepository _tagRepository;
        private readonly IImageRepository _imageRepository;

        public BookRepository(BookRealmDbContext dbContext,IMappingHelper mappingHelper,ITagRepository tagRepository,IImageRepository imageRepository)
        {
            _dbContext = dbContext;
            _mappingHelper = mappingHelper;
            _tagRepository = tagRepository;
            _imageRepository = imageRepository;
        }

        public async Task<List<Book>> GetAllBooks(int pageNumber, int pageSize)
        {
           
            int itemsToSkip = (pageNumber - 1) * pageSize;

            var booksQuery = _dbContext.Books
                .Include(b => b.Author)
                .Include(b => b.Publisher)
                .Include(b => b.Genre)
                .Include(b => b.Subgenre);

            
            var pagedBooks = await booksQuery
                .OrderBy(b => b.Id) 
                .Skip(itemsToSkip)
                .Take(pageSize)
                .ToListAsync();

            var booksWithDetails = new List<Book>();

            foreach (var book in pagedBooks)
            {
                book.Reviews = await _dbContext.Reviews.Where(r => r.BookId == book.Id).ToListAsync();
                book.Tags = await _dbContext.BookTags.Where(t => t.BookId == book.Id).ToListAsync();
                book.Images = await _dbContext.BookImages.Where(i => i.BookId == book.Id).ToListAsync();

                booksWithDetails.Add(book);
            }

            return booksWithDetails;
        }

        public async Task<List<Book>> GetBooksBySubgenre(string subgenreId)
        {

            var booksQuery = await _dbContext.Books
                .Include(b => b.Author)
                .Include(b => b.Publisher)
                .Include(b => b.Genre)
                .Include(b => b.Subgenre).Where(b => b.Subgenre.Id == Guid.Parse(subgenreId)).ToListAsync();

            var booksWithDetails = new List<Book>();

            foreach (var book in booksQuery)
            {
                book.Reviews = await _dbContext.Reviews.Where(r => r.BookId == book.Id).ToListAsync();
                book.Tags = await _dbContext.BookTags.Where(t => t.BookId == book.Id).ToListAsync();
                book.Images = await _dbContext.BookImages.Where(i => i.BookId == book.Id).ToListAsync();

                booksWithDetails.Add(book);
            }

            return booksWithDetails;
        }

        public async Task<Book> GetBookById(Guid id)
        {
            var book = await _dbContext.Books.Include(b => b.Author).Include(b => b.Publisher).Include(b => b.Genre).Include(b => b.Subgenre).FirstOrDefaultAsync();

            book.Reviews = await _dbContext.Reviews.Where(b => b.BookId == book.Id).ToListAsync();
            book.Tags = await _dbContext.BookTags.Where(t => t.BookId == book.Id).ToListAsync();
            book.Images = await _dbContext.BookImages.Where(id => id.BookId == book.Id).ToListAsync();

            return book;

        }

        public async Task<Book> CreateBook(Book book)
        {
            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<string> CreateMultipleBooks(List<BookDTO> booksDtos)
        {
            foreach (var bookDto in booksDtos)
            {
                var book = _mappingHelper.MapToBook(bookDto);
                _dbContext.Books.Add(book);
                await _dbContext.SaveChangesAsync();
                book.Tags = await _tagRepository.SaveAndGetBookTags(book.Id, bookDto.Tags);

                foreach (var item in bookDto.Images)
                {
                    try
                    {
                        var imageUploadResult = await _imageRepository.UploadImageFromUrl(item, "Book", book.Title);
                        var Id = imageUploadResult.PublicId.Split('/').Last();
                        var image = new BookImage()
                        {
                            Id = Guid.Parse(Id),
                            Name = book.Title,
                            Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                            Type = "Book",
                            BookId = book.Id,
                            Book = await GetBookById(book.Id)
                        };
                        var imageResult = await _imageRepository.CreateBookImage(image);
                    }
                    catch(Exception ex)
                    {
                        continue;
                    }
                }
            }

            return "uploaded";
        }

        public async Task<Book> UpdateBook(Guid id, Book book)
        {
            if (!BookExists(id))
            {
                throw new InvalidOperationException("Book not found");
            }
            _dbContext.Entry(book).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<Book> DeleteBook(Guid id)
        {
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                throw new InvalidOperationException("Book not found");
            }

            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();

            return book;
        }

        private bool BookExists(Guid id)
        {
            return _dbContext.Books.Any(e => e.Id == id);
        }
    }
}
