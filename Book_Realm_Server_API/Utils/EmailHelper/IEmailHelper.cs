using Book_Realm_Server_API.Payloads;

namespace Book_Realm_Server_API.Utils.EmailHelper
{
    public interface IEmailHelper
    {
        public Task SendEmail(Email email);
        public string CreateMailBody(string email, string token);
    }
}
