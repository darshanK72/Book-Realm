using Book_Realm_API.Payloads;
using CloudinaryDotNet.Actions;

namespace Book_Realm_API.Utils.ImageHelper
{
    public interface IImageHelper
    {
        Task<ImageUploadResult> UploadImage(IFormFile file,string folder,string fileName);
        Task<ImageUploadResult> UploadImageFromUrl(string imageUrl, string folder,string fileName);
        Task DeleteImage(string publicId);

        Task DeleteAllImages(string folderName);
    }
}
