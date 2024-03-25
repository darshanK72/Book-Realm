using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Repositories.BannerRepository;
using Book_Realm_API.Repositories.BookRepository;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Repositories.UserRepository;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepository _imageRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBannerRepository _bannerRepository;
        private readonly IConfiguration _configuration;

        public ImageController(IImageRepository imageRepository,IBookRepository bookRepository,IUserRepository userRepository,IBannerRepository bannerRepository,IConfiguration configuration)
        {
            _imageRepository = imageRepository;
            _bookRepository = bookRepository;
            _userRepository = userRepository;
            _bannerRepository = bannerRepository;
            _configuration = configuration;
        }

        [HttpPost("book/upload")]
        public async Task<ActionResult<Image>> UploadBookImage(IFormFile file,string fileName,Guid bookId)
        {
            try
            {
                var imageUploadResult = await _imageRepository.UploadImage(file,"Book",fileName);

                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new BookImage()
                {
                    Id = Guid.Parse(Id),
                    Name = fileName,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Book",
                    BookId = bookId,
                    Book = await _bookRepository.GetBookById(bookId)

                };
                var imageResult = await _imageRepository.CreateImage(image);
                return Ok(imageResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("book/uploadfromurl")]
        public async Task<ActionResult<Image>> UploadImageFromUrl(ImageUploadURLRequest imageUploadURLRequest)
        {
            try
            {
                var imageUploadResult = await _imageRepository.UploadImageFromUrl(imageUploadURLRequest.ImageUrl,"Book", imageUploadURLRequest.FileName);
                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new BookImage()
                {
                    Id = Guid.Parse(Id),
                    Name = imageUploadURLRequest.FileName,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Book",
                    BookId = imageUploadURLRequest.BookId,
                    Book = await _bookRepository.GetBookById(imageUploadURLRequest.BookId)
                };
                var imageResult = await _imageRepository.CreateImage(image);
                return Ok(imageResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("profile/upload")]
        public async Task<ActionResult<Image>> UploadProfileImage(IFormFile file, string fileName,Guid userId)
        {
            try
            {
                var imageUploadResult = await _imageRepository.UploadImage(file,"Profile", fileName);
                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new ProfileImage()
                {
                    Id = Guid.Parse(Id),
                    Name = fileName,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Profile",
                    UserId = userId,
                    User = await _userRepository.GetUserById(userId)

                };
                var imageResult = await _imageRepository.CreateImage(image);
                return Ok(imageResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("banner/upload")]
        public async Task<ActionResult<Image>> UploadBannerImage(IFormFile file, string fileName,Guid bannerId)
        {
            try
            {
                var imageUploadResult = await _imageRepository.UploadImage(file,"Banner", fileName);
                var Id = imageUploadResult.PublicId.Split('/').Last();
                var image = new BannerImage()
                {
                    Id = Guid.Parse(Id),
                    Name = fileName,
                    Src = imageUploadResult.SecureUrl.AbsoluteUri.ToString(),
                    Type = "Banner",
                    BannerId = bannerId,
                    Banner = await _bannerRepository.GetBannerById(bannerId)
                };
                var imageResult = await _imageRepository.CreateImage(image);
                return Ok(imageResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("book/delete/all")]
        public async Task<ActionResult<string>> DeleteBookImage()
        {
            try
            {
                await _imageRepository.DeleteAllImages();
                return Ok("deleted");
            }
            catch (Exception ex)
            {
                //return StatusCode(500, $"Internal server error: {ex.Message}");
                return BadRequest(ex);
            }
        }


        [HttpDelete("book/delete/{Id}")]
        public async Task<ActionResult<Image>> DeleteBookImage([FromRoute] Guid Id)
        {
            try
            {
                await _imageRepository.DeleteImageByPublicId(Id,"Book");
                var deletedImage = await _imageRepository.DeleteImage(Id);
                return Ok(deletedImage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("profile/delete/{Id}")]
        public async Task<ActionResult<Image>> DeleteProfileImage([FromRoute] Guid Id)
        {
            try
            {
                await _imageRepository.DeleteImageByPublicId(Id, "Profile");
                var deletedImage = await _imageRepository.DeleteImage(Id);
                return Ok(deletedImage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("banner/delete/{Id}")]
        public async Task<ActionResult<Image>> DeleteBannerImage([FromRoute] Guid Id)
        {
            try
            {
                await _imageRepository.DeleteImageByPublicId(Id, "Banner");
                var deletedImage = await _imageRepository.DeleteImage(Id);
                return Ok(deletedImage);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
