using Book_Realm_API.Models;
using Book_Realm_API.Payloads;

namespace Book_Realm_API.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<SignInResponse> SignIn(User user);
        Task SignUp(User user);
    }
}
