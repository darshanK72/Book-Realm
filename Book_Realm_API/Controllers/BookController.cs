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
using Microsoft.EntityFrameworkCore;
using Book_Realm_API.Repositories.TagRepository;
using Book_Realm_API.Repositories.ImageRepository;

namespace Book_Realm_API.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IMappingHelper _mapper;

        public BookController(IBookRepository bookRepository,ITagRepository tagRepository,IImageRepository imageRepository, IMappingHelper mapper)
        {
            _bookRepository = bookRepository;
            _tagRepository = tagRepository;
            _imageRepository = imageRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookDTO>>> GetBooks([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            try
            {
                var books = await _bookRepository.GetAllBooks(pageNumber,pageSize);
                var bookDtos = books.Select(b => _mapper.MapToBookDTO(b)).ToList();
                return Ok(bookDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("subgenre/{subgenreId}")]
        public async Task<ActionResult<List<BookDTO>>> GetBooksBySubgenre(string subgenreId)
        {
            try
            {
                var books = await _bookRepository.GetBooksBySubgenre(subgenreId);
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
                
                var addedBook = await _bookRepository.CreateBook(bookDto);
                return CreatedAtAction(nameof(GetBook), bookDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("multiple")]
        public async Task<ActionResult<string>> CreateBookS(List<BookDTO> bookDtos)
        {
            try
            {
                var result = await _bookRepository.CreateMultipleBooks(bookDtos);
                return Ok(result);
                
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
