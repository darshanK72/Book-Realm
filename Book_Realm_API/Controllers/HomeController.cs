using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.BookRepository;
using Book_Realm_API.Repositories.HeroRepository;
using Book_Realm_API.Repositories.HomeRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomeRepository _homeRepository;
        private readonly IHeroRepository _heroRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IMappingHelper _mapper;

        public HomeController(IHomeRepository homeRepository,IMappingHelper mapper,IHeroRepository heroRepository,IBookRepository bookRepository)
        {
            _homeRepository = homeRepository;
            _heroRepository = heroRepository;
            _bookRepository = bookRepository;
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


        [HttpPost("heros")]
        public async Task<ActionResult<List<HeroDTO>>> GetHerosByListOfIds(List<string> heroIds)
        {
            try
            {
                var heros = await _heroRepository.GetAllHerosByIds(heroIds);
                var heroDtos = heros.Select(hero => _mapper.MapToHeroDTO(hero));
                return Ok(heroDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("books")]
        public async Task<ActionResult<List<BookDTO>>> GetBooksByListOfIds(List<string> bookIds)
        {
            try
            {
                var books = new List<Book>();
                foreach (var id in bookIds)
                {
                    var book = await _bookRepository.GetBookById(Guid.Parse(id));
                    books.Add(book);
                }

                var bookDtos = books.Select(book => _mapper.MapToBookDTO(book));
                return Ok(bookDtos);
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

        [HttpPost("book-section")]
        public async Task<ActionResult<HomeSectionDTO>> CreateHomePageSection(HomeSectionDTO sectionDto)
        {
            try
            {
                sectionDto.SectionName = "Book";
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection);
                return CreatedAtAction(nameof(GetHomePageSection), new { id = Guid.Parse(newSectionDto.Id) }, newSectionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("hero-section")]
        public async Task<ActionResult<HomeSectionDTO>> CreateHeroSection(HomeSectionDTO sectionDto)
        {
            try
            {
                sectionDto.SectionName = "Hero";
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection);
                return CreatedAtAction(nameof(GetHomePageSection), new { id = Guid.Parse(newSectionDto.Id) }, newSectionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("small-banner-section")]
        public async Task<ActionResult<HomeSectionDTO>> CreateSmallBannerSection(HomeSectionDTO sectionDto)
        {
            try
            {
                sectionDto.SectionName = "SmallBanner";
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection);
                return CreatedAtAction(nameof(GetHomePageSection), new { id = Guid.Parse(newSectionDto.Id) }, newSectionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("medium-banner-section")]
        public async Task<ActionResult<HomeSectionDTO>> CreateMediumBannerSection(HomeSectionDTO sectionDto)
        {
            try
            {
                sectionDto.SectionName = "MediumBanner";
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection);
                return CreatedAtAction(nameof(GetHomePageSection), new { id = Guid.Parse(newSectionDto.Id) }, newSectionDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("large-banner-section")]
        public async Task<ActionResult<HomeSectionDTO>> CreateLargeBannerSection(HomeSectionDTO sectionDto)
        {
            try
            {
                sectionDto.SectionName = "LargeBanner";
                var newSection = await _homeRepository.CreateHomePageSection(sectionDto);
                var newSectionDto = _mapper.MapToHomeSectionDTO(newSection);
                return CreatedAtAction(nameof(GetHomePageSection), new { id = Guid.Parse(newSectionDto.Id) }, newSectionDto);
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
