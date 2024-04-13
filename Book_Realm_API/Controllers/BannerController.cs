using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.BannerRepository;
using Book_Realm_API.Utils.MappingHelper;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/banners")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly IBannerRepository _bannerRepository;
        private readonly IMappingHelper _mappingHelper;

        public BannerController(IBannerRepository bannerRepository,IMappingHelper mappingHelper)
        {
            _bannerRepository = bannerRepository;
            _mappingHelper = mappingHelper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Banner>>> GetBanners()
        {
            try
            {
                var banners = await _bannerRepository.GetAllBanners();
                return Ok(banners);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BannerDTO>> GetBanner(Guid id)
        {
            try
            {
                var banner = await _bannerRepository.GetBannerById(id);
                var bannerDto = _mappingHelper.MapToBannerDTO(banner);
                return Ok(bannerDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpPost("small-banner")]
        public async Task<ActionResult<BannerDTO>> CreateSmallBanner(BannerDTO bannerDto)
        {
            try
            {
                bannerDto.BannerType = "SMALL";
                var newBanner = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(bannerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("medium-banner")]
        public async Task<ActionResult<BannerDTO>> CreateMediumBanner(BannerDTO bannerDto)
        {
            try
            {
                bannerDto.BannerType = "MEDIUM";
                var newBanner = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(bannerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("large-banner")]
        public async Task<ActionResult<BannerDTO>> CreateLargeBanner(BannerDTO bannerDto)
        {
            try
            {
                bannerDto.BannerType = "LARGE";
                var newBanner = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(bannerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBanner(Guid id, Banner banner)
        {
            try
            {
                var updatedBanner = await _bannerRepository.UpdateBanner(id, banner);
                return Ok(updatedBanner);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Banner>> DeleteBanner(Guid id)
        {
            try
            {
                var banner = await _bannerRepository.DeleteBanner(id);
                return Ok(banner);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
