namespace Book_Realm_API.Payloads
{
    public class SignUpRequest
    {
        public string Name {  get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
        public DateTime FoundationDate { get; set; }
        public string WebsiteUrl { get; set; }
    }
}
