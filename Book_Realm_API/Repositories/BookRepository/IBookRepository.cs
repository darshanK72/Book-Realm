using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Book_Realm_API.Repositories.BookRepository
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllBooks(int pageNumber, int pageSize);

        Task<List<Book>> GetBooksBySubgenre(string subgenreId);

        Task<List<Book>> GetAllBooksByIds(List<string> bookIds);
        Task<Book> GetBookById(Guid id);
        Task<string> CreateBook(BookDTO book);
        Task<string> CreateMultipleBooks(List<BookDTO> booksDtos);
        Task<Book> UpdateBook(Guid id, Book book);
        Task<Book> DeleteBook(Guid id);
    }
}
