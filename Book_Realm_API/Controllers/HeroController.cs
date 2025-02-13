using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.HeroRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/heros")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly IHeroRepository _heroRepository;
        private readonly IMappingHelper _mappingHelper;

        public HeroController(IHeroRepository heroRepository, IMappingHelper mappingHelper)
        {
            _heroRepository = heroRepository;
            _mappingHelper = mappingHelper;
        }

        [HttpGet]
        public async Task<ActionResult<List<HeroDTO>>> GetHeros()
        {
            try
            {
                var heros = await _heroRepository.GetAllHeros();
                var heroDtos = heros.Select(hero => _mappingHelper.MapToHeroDTO(hero));
                return Ok(heroDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("hero-ids")]
        public async Task<ActionResult<List<HeroDTO>>> GetHerosByListOfIds(List<string> heroIds)
        {
            try
            {
                var heros = await _heroRepository.GetAllHerosByIds(heroIds);
                var heroDtos = heros.Select(hero => _mappingHelper.MapToHeroDTO(hero));
                return Ok(heroDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HeroDTO>> GetHero(Guid id)
        {
            try
            {
                var hero = await _heroRepository.GetHeroById(id);
                var heroDto = _mappingHelper.MapToHeroDTO(hero);
                return Ok(heroDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<HeroDTO>> CreateHero(HeroDTO heroDto)
        {
            try
            {
                var newHero = await _heroRepository.CreateHero(heroDto);
                return CreatedAtAction(nameof(GetHero), heroDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHero(Guid id, Hero hero)
        {
            try
            {
                var updatedHero = await _heroRepository.UpdateHero(id,hero);
                return Ok(updatedHero);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Hero>> DeleteHero(Guid id)
        {
            try
            {
                var Hero = await _heroRepository.DeleteHero(id);
                return Ok(Hero);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
