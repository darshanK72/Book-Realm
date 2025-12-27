using Book_Realm_API.Payloads;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Book_Realm_API.Utils.ImageHelper
{
    public class ImageHelper : IImageHelper
    {
        private readonly Cloudinary _cloudinary;
        private readonly Account _account;
        public ImageHelper(IConfiguration configuration) 
        { 
            _account = new Account(configuration["Cloudinary:CloudName"], configuration["Cloudinary:ApiKey"], configuration["Cloudinary:ApiSecret"]);
            _cloudinary = new Cloudinary(_account);
        }
        public async Task<ImageUploadResult> UploadImage(IFormFile file,string folder,string fileName)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty");

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Seek(0, SeekOrigin.Begin);

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(fileName, stream),
                    PublicId = Guid.NewGuid().ToString(),
                    Folder = folder,
                    UseFilename = true
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                return uploadResult;
            }
        }

        public async Task DeleteImage(string publicId)
        {
            await _cloudinary.DeleteResourcesAsync(new[] {publicId});
        }

        public async Task DeleteAllImages(string folderName)
        {
            string prefix = folderName + "/";

            var listParams = new ListResourcesParams
            {
                ResourceType = ResourceType.Image,
                MaxResults = 500
            };

            var result = await _cloudinary.ListResourcesAsync(listParams);

            List<string> publicIds = new List<string>();
            foreach (var resource in result.Resources)
            {
            await _cloudinary.DeleteResourcesAsync(new[] {resource.PublicId} );
            }


        }

        public async Task<ImageUploadResult> UploadImageFromUrl(string imageUrl, string folder, string fileName)
        {
            if (string.IsNullOrEmpty(imageUrl))
                throw new ArgumentNullException(nameof(imageUrl), "Image URL cannot be null or empty");

            try
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(imageUrl),
                    PublicId = Guid.NewGuid().ToString(),
                    Folder = folder,
                    UseFilename = true
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return uploadResult;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error uploading image from URL: {ex.Message}");
            }
        }
    }
}
