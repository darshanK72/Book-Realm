using Book_Realm_API.DTO;
using Book_Realm_API.Models;
using Book_Realm_API.Repositories.BannerRepository;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/banners")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly IBannerRepository _bannerRepository;

        public BannerController(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
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
                return Ok(banner);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<BannerDTO>> CreateBanner(BannerDTO bannerDto)
        {
            try
            {
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
