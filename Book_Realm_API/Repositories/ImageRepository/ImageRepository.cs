using Book_Realm_API.Models;
using Book_Realm_API.Payloads;
using Book_Realm_API.Utils.ImageHelper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Book_Realm_API.Repositories.ImageRepository
{
    public class ImageRepository : IImageRepository
    {
        private readonly IConfiguration _configuration;
        private readonly BookRealmDbContext _dbContext;
        private readonly IImageHelper _imageHelper;

        public ImageRepository(IConfiguration configuration,BookRealmDbContext context,IImageHelper imageHelper)
        {
            _configuration = configuration;
            _dbContext = context;
            _imageHelper = imageHelper;
        }

        public async Task<ImageUploadResult> UploadImage(IFormFile file,string folder,string fileName)
        {
            var uploadFolder = GetUploadFolder(folder);
            var imageUploadResult = await _imageHelper.UploadImage(file, uploadFolder, fileName);
            return imageUploadResult;
        }

        public async Task<ImageUploadResult> UploadImageFromUrl(string imageUrl,string folder,string fileName)
        {
            var uploadFolder = GetUploadFolder(folder);
            var imageUploadResult = await _imageHelper.UploadImageFromUrl(imageUrl,uploadFolder,fileName);
            return imageUploadResult;
        }
        public async Task DeleteImageByPublicId(Guid Id,string folder)
        {
            var uploadFolder = GetUploadFolder(folder);
            await _imageHelper.DeleteImage(uploadFolder + "/" + Id.ToString());
        }

        public async Task DeleteAllImages()
        {
            var uploadFolder = GetUploadFolder("Book");
            await _imageHelper.DeleteAllImages(uploadFolder);
        }

        public async Task<Image> GetImageById(Guid id)
        {
            var image = await _dbContext.Images.FindAsync(id);

            if (image == null)
            {
                throw new InvalidOperationException("Image not found");
            }

            return image;
        }

        public async Task<Image> CreateBookImage(BookImage image)
        {

            var book = await _dbContext.Books.FindAsync(image.BookId);
            image.Book = book;
            image.BookId = book.Id;
            _dbContext.BookImages.Add(image);

            await _dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<Image> CreateBannerImage(BannerImage image)
        {

            var banner = await _dbContext.Banners.FindAsync(image.BannerId);
            image.Banner = banner;
            image.BannerId = banner.Id;
            _dbContext.BannerImages.Add(image);

            await _dbContext.SaveChangesAsync();
            return image;
        }
        public async Task<Image> CreateHeroImage(HeroImage image)
        {

            var hero = await _dbContext.Heros.FindAsync(image.HeroId);
            image.Hero = hero;
            image.HeroId = hero.Id;
            _dbContext.HeroImages.Add(image);

            await _dbContext.SaveChangesAsync();
            return image;
        }



        public async Task<Image> CreateImage(Image image)
        {

            _dbContext.Images.Add(image);
            await _dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<Image> UpdateImage(Guid id, Image image)
        {
            if (!ImageIdExists(id))
            {
                throw new InvalidOperationException("Image not found");
            }
            _dbContext.Entry(image).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<Image> DeleteImage(Guid id)
        {
            var image = await _dbContext.Images.FindAsync(id);
            if (image == null)
            {
                throw new InvalidOperationException("Image not found");
            }
            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();
            return image;
        }

        private bool ImageIdExists(Guid id)
        {
            return _dbContext.Images.Any(e => e.Id == id);
        }

        public string GetUploadFolder(string folder)
        {
            string imageFolder = String.Empty;
            if (folder == "Book")
            {
                imageFolder = _configuration["Cloudinary:BookFolder"];
            }
            else if (folder == "Profile")
            {
                imageFolder = _configuration["Cloudinary:UserProfileFolder"];
            }
            else if (folder == "Banner")
            {
                imageFolder = _configuration["Cloudinary:BannerFolder"];
            }
            return imageFolder;
        }
    }
}
