﻿using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.GenreRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreRepository _genreRepository;
        private readonly IMappingHelper _mapper;

        public GenreController(IGenreRepository genreRepository,IMappingHelper mapper)
        {
            _genreRepository = genreRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<SubenreDTO>>> GetGenres()
        {
            try
            {
                var genres = await _genreRepository.GetAllGenres();
                var genreDtos = genres.Select(genre => _mapper.MapToGenreDTO(genre)).ToList();
                return Ok(genreDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubenreDTO>> GetGenre(Guid id)
        {
            try
            {
                var genre = await _genreRepository.GetGenreById(id);
                var genreDto = _mapper.MapToGenreDTO(genre);
                return Ok(genreDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SubenreDTO>> CreateGenre(SubenreDTO genreDto)
        {
            try
            {
                var genre = _mapper.MapToGenre(genreDto);
                var newGenre = await _genreRepository.CreateGenre(genre);
                genreDto = _mapper.MapToGenreDTO(newGenre);
                return CreatedAtAction(nameof(GetGenre), new { id = genreDto.Id }, genreDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("multiple")]
        public async Task<ActionResult<SubenreDTO>> CreateMultipleGenre(List<SubenreDTO> genreDtos)
        {
            try
            {
                var genres = genreDtos.Select(genreDto =>  _mapper.MapToGenre(genreDto)).ToList();
                var newGenres = await _genreRepository.CreateMultipleGenre(genres);
                genreDtos =newGenres.Select( newGenre => _mapper.MapToGenreDTO(newGenre)).ToList();
                return Ok(genreDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<SubenreDTO>> UpdateGenre(Guid id, SubenreDTO genreDto)
        {
            try
            {
                var genre = _mapper.MapToGenre(genreDto);
                var updatedGenre = await _genreRepository.UpdateGenre(id, genre);
                genreDto = _mapper.MapToGenreDTO(updatedGenre);
                return Ok(genreDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SubenreDTO>> DeleteGenre(Guid id)
        {
            try
            {
                var genre = await _genreRepository.DeleteGenre(id);
                var genreDto = _mapper.MapToGenreDTO(genre);
                return Ok(genreDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}