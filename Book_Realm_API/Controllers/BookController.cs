using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories;
using Book_Realm_API.DTO;
using Book_Realm_API.Utils.MappingHelper;
using Book_Realm_API.Repositories.BookRepository;

namespace Book_Realm_API.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMappingHelper _mapper;

        public BookController(IBookRepository bookRepository, IMappingHelper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookDTO>>> GetBooks()
        {
            try
            {
                var books = await _bookRepository.GetAllBooks();
                var bookDtos = books.Select(b => _mapper.MapToBookDTO(b)).ToList();
                return Ok(bookDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDTO>> GetBook(Guid id)
        {
            try
            {
                var book = await _bookRepository.GetBookById(id);
                var bookDto = _mapper.MapToBookDTO(book);
                return Ok(bookDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<BookDTO>> CreateBook(BookDTO bookDto)
        {
            try
            {
                var book = _mapper.MapToBook(bookDto);
                var addedBook = await _bookRepository.CreateBook(book);
                bookDto = _mapper.MapToBookDTO(book);
                return CreatedAtAction(nameof(GetBook), new { id = bookDto.Id }, bookDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BookDTO>> UpdateBook(Guid id, BookDTO bookDto)
        {
            try
            {
                var book = _mapper.MapToBook(bookDto);
                var updatedBook = await _bookRepository.UpdateBook(id, book);
                bookDto = _mapper.MapToBookDTO(book);
                return Ok(bookDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BookDTO>> DeleteBook(Guid id)
        {
            try
            {
                var book = await _bookRepository.DeleteBook(id);
                var bookDto = _mapper.MapToBookDTO(book);
                return Ok(bookDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
