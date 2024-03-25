using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using CloudinaryDotNet.Actions;

namespace Book_Realm_API.Repositories.ImageRepository
{
    public interface IImageRepository
    {
        Task<ImageUploadResult> UploadImage(IFormFile file,string folder,string fileName);
        Task<ImageUploadResult> UploadImageFromUrl(string imageUrl, string folder, string fileName);
        Task DeleteImageByPublicId(Guid id,string folder);
        Task<Image> GetImageById(Guid id);
        Task<Image> CreateBookImage(BookImage image);
        Task<Image> CreateImage(Image image);
        Task<Image> UpdateImage(Guid id, Image image);
        Task<Image> DeleteImage(Guid id);

        Task DeleteAllImages();
    }
}
