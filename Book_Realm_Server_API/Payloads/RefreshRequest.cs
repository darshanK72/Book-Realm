namespace Book_Realm_Server_API.Payloads
{
    public class RefreshRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
