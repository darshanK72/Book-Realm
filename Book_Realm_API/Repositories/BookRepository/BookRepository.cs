using Book_Realm_API.Models;
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

        public BookRepository(BookRealmDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Book>> GetAllBooks()
        {
            var books = await _dbContext.Books.Include(b => b.Author).Include(b => b.Publisher).Include(b => b.Genre).Include(b => b.Subgenre).ToListAsync();

            var booksWithDetails = await Task.WhenAll(books.Select(async book =>
            {
                book.Reviews = await _dbContext.Reviews.Where(r => r.BookId == book.Id).ToListAsync();
                book.Tags = await _dbContext.Tags.Where(t => t.BookId == book.Id).ToListAsync();
                book.Images = await _dbContext.Images.Where(i => i.BookId == book.Id).ToListAsync();
                return book;
            }));

            return booksWithDetails.ToList();
        }

        public async Task<Book> GetBookById(Guid id)
        {
            var book = await _dbContext.Books.Include(b => b.Author).Include(b => b.Publisher).Include(b => b.Genre).Include(b => b.Subgenre).FirstOrDefaultAsync();

            book.Reviews = await _dbContext.Reviews.Where(b => b.BookId == book.Id).ToListAsync();
            book.Tags = await _dbContext.Tags.Where(t => t.BookId == book.Id).ToListAsync();
            book.Images = await _dbContext.Images.Where(id => id.BookId == book.Id).ToListAsync();

            return book;

        }

        public async Task<Book> CreateBook(Book book)
        {
            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
            return book;
        }

        public async Task<List<Book>> CreateMultipleBooks(List<Book> books)
        {
            _dbContext.Books.AddRange(books);
            await _dbContext.SaveChangesAsync();
            return books;
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
