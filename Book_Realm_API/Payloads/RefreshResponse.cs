namespace Book_Realm_API.Payloads
{
    public class RefreshResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Message { get; set; }
    }
}
