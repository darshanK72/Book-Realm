using Book_Realm_API.DTO;

namespace Book_Realm_API.Payloads
{
    public class SignInResponse
    {
        public UserDTO User { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Message { get; set; }
    }
}
