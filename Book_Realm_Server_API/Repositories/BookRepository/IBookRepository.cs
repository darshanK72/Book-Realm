using Book_Realm_Server_API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Book_Realm_Server_API.Repositories.BookRepository
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooks();
        Task<Book> GetBookById(Guid id);
        Task<Book> CreateBook(Book book);
        Task<Book> UpdateBook(Guid id, Book book);
        Task<Book> DeleteBook(Guid id);
    }
}
