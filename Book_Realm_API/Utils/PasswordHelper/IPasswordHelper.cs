namespace Book_Realm_API.Utils.PasswordHelper
{
    public interface IPasswordHelper
    {
        public string Encode(string password);
        public bool Decode(string password, string base64Hash);
    }
}
