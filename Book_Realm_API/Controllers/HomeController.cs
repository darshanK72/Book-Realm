using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.HomeRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Mvc;
using static System.Collections.Specialized.BitVector32;

namespace Book_Realm_API.Controllers
{
    [Route("api/home/sections")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomeRepository _homeRepository;
        private readonly IMappingHelper _mapper;

        public HomeController(IHomeRepository homeRepository,IMappingHelper mapper)
        {
            _homeRepository = homeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<HomeSectionDTO>>> GetHomePageSections()
        {
            try
            {
                var sections = await _homeRepository.GetAllHomePageSections();
                var sectionsDto = sections.Select(s => _mapper.MapToHomeSectionDTO(s)).ToList();
                return Ok(sectionsDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HomeSectionDTO>> GetHomePageSection(Guid id)
        {
            try
            {
                var section = await _homeRepository.GetHomePageSectionById(id);
                var sectionDto = _mapper.MapToHomeSectionDTO(section);
                return Ok(sectionDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<HomeSectionDTO>> CreateHomePageSection(HomeSectionDTO sectionDto)
        {
            try
            {
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection); ;
                return CreatedAtAction(nameof(GetHomePageSection), new { id = sectionDto.Id }, newSectionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<HomeSectionDTO>> UpdateHomePageSection(Guid id, HomeSectionDTO sectionDto)
        {
            try
            {
                var updatedSection = await _homeRepository.UpdateHomePageSection(id, sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(updatedSection); 
                return Ok(newSectionDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<HomeSectionDTO>> DeleteHomePageSection(Guid id)
        {
            try
            {
                var section = await _homeRepository.DeleteHomePageSection(id);
                var sectionDto = _mapper.MapToHomeSectionDTO(section);
                return Ok(section);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
