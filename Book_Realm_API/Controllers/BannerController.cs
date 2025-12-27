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
        public async Task<ActionResult<List<BannerDTO>>> GetBanners()
        {
            try
            {
                var banners = await _bannerRepository.GetAllBanners();
                var bannerDtos = banners.Select(banner => _mappingHelper.MapToBannerDTO(banner)).ToList();
                return Ok(bannerDtos);
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

        [HttpPost("byIds")]
        public async Task<ActionResult<List<BannerDTO>>> GetBannerByListOfIds(List<string> bannerIds)
        {
            try
            {
                var banners = await _bannerRepository.GetAllBannersByIds(bannerIds);
                var bannerDtos = banners.Select(banner => _mappingHelper.MapToBannerDTO(banner));
                return Ok(bannerDtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("small-banner")]
        public async Task<ActionResult<BannerDTO>> CreateSmallBanner(BannerDTO bannerDto)
        {
            try
            {
                bannerDto.BannerType = "SMALL";
                var newBannerDto = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(newBannerDto);
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
                var newBannerDto = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(newBannerDto);
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
                var newBannerDto = await _bannerRepository.CreateBanner(bannerDto);
                return Ok(newBannerDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BannerDTO>> UpdateBanner(Guid id, BannerDTO bannerDto)
        {
            try
            {
                var updatedBanner = await _bannerRepository.UpdateBanner(id, bannerDto);
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
