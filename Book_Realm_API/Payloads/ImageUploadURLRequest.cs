namespace Book_Realm_API.Payloads
{
    public class ImageUploadURLRequest
    {
        public string ImageUrl { get; set; }
        public string FileName { get; set; }
        public Guid BookId { get; set; }
    }
}
