using System.Security.Cryptography;

namespace Book_Realm_Server_API.Utils.PasswordHelper
{
    public class PasswordHelper : IPasswordHelper
    {
        RandomNumberGenerator _randomNumberGenerator;

        public PasswordHelper()
        {
            this._randomNumberGenerator = RandomNumberGenerator.Create();
        }

        private readonly int SaltSize = 16;
        private readonly int HashSize = 20;
        private readonly int Iterations = 10000;

        public string Encode(string password)
        {
            byte[] salt;
            this._randomNumberGenerator.GetBytes(salt = new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize);

            var hashByte = new byte[SaltSize + HashSize];

            Array.Copy(salt, 0, hashByte, 0, SaltSize);
            Array.Copy(hash, 0, hashByte, SaltSize, HashSize);

            var base64Hash = Convert.ToBase64String(hashByte);

            return base64Hash;
        }

        public bool Decode(string password, string base64Hash)
        {
            var hashByte = Convert.FromBase64String(base64Hash);

            var salt = new byte[SaltSize];

            Array.Copy(hashByte, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize);

            for (var i = 0; i < HashSize; i++)
            {
                if (hashByte[i + SaltSize] != hash[i])
                {
                    return false;
                }
            }
            return true;
        }
    }
}
