using Book_Realm_Server_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Book_Realm_Server_API.Repositories.BookRepository
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
            return await _dbContext.Books.ToListAsync();
        }

        public async Task<Book> GetBookById(Guid id)
        {
            return await _dbContext.Books.FindAsync(id);
        }

        public async Task<Book> CreateBook(Book book)
        {
            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
            return book;
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
