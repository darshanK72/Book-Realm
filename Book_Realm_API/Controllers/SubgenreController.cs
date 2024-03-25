using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Repositories.SubgenreRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/subgenres")]
    [ApiController]
    public class SubgenreController : ControllerBase
    {
        private readonly ISubgenreRepository _subgenreRepository;
        private readonly IMappingHelper _mapper;

        public SubgenreController(ISubgenreRepository subgenreRepository,IMappingHelper mapper)
        {
            _subgenreRepository = subgenreRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<SubgenreDTO>>> GetSubgenres()
        {
            try
            {
                var subgenres = await _subgenreRepository.GetAllSubgenres();
                var subgenreDtos = subgenres.Select(s => _mapper.MapToSubgenreDTO(s));
                return Ok(subgenreDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SubgenreDTO>> GetSubgenre(Guid id)
        {
            try
            {
                var subgenre = await _subgenreRepository.GetSubgenreById(id);
                var subgenreDto = _mapper.MapToSubgenreDTO(subgenre);
                return Ok(subgenreDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("random")]
        public async Task<ActionResult<SubgenreDTO>> GetRandom6Subgenres()
        {
            try
            {
                var subgenres = await _subgenreRepository.GetRandom6Subgenres();
                var subgenreDtos = subgenres.Select(s => _mapper.MapToSubgenreDTO(s));
                return Ok(subgenreDtos);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("name")]
        public async Task<ActionResult<SubgenreDTO>> GetSubgenreByName(GetSubgenreRequest getSubgenreRequest)
        {
            try
            {
                var subgenre = await _subgenreRepository.GetSubgenreByName(getSubgenreRequest);
                var subgenreDto = _mapper.MapToSubgenreDTO(subgenre);
                return Ok(subgenreDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<SubgenreDTO>> CreateSubgenre(SubgenreDTO subgenreDto)
        {
            try
            {
                var subgenre = _mapper.MapToSubgenre(subgenreDto);
                var newSubgenre = await _subgenreRepository.CreateSubgenre(subgenre);
                subgenreDto = _mapper.MapToSubgenreDTO(newSubgenre);
                return CreatedAtAction(nameof(GetSubgenre), new { id = subgenreDto.Id }, subgenreDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("multiple")]
        public async Task<ActionResult<SubgenreDTO>> CreateMultipleGenre(List<SubgenreDTO> subgenreDtos)
        {
            try
            {
                var subgenres = subgenreDtos.Select(subgenreDto => _mapper.MapToSubgenre(subgenreDto)).ToList();
                var newSubgenres = await _subgenreRepository.CreateMultipleSubgenre(subgenres);
                subgenreDtos = newSubgenres.Select(newSubgenre => _mapper.MapToSubgenreDTO(newSubgenre)).ToList();
                return Ok(subgenreDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SubgenreDTO>> UpdateSubgenre(Guid id, SubgenreDTO subgenreDto)
        {
            try
            {
                var subgenre = _mapper.MapToSubgenre(subgenreDto);
                var updatedSubgenre = await _subgenreRepository.UpdateSubgenre(id, subgenre);
                subgenreDto = _mapper.MapToSubgenreDTO(updatedSubgenre);
                return Ok(updatedSubgenre);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<SubgenreDTO>> DeleteSubgenre(Guid id)
        {
            try
            {
                var subgenre = await _subgenreRepository.DeleteSubgenre(id);
                var subgenreDto = _mapper.MapToSubgenreDTO(subgenre);
                return Ok(subgenreDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
