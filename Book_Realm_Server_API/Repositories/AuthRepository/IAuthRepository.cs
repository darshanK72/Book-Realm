using Book_Realm_Server_API.Models;
using Book_Realm_Server_API.Payloads;

namespace Book_Realm_Server_API.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<SignInResponse> SignIn(SignInRequest signInRequest);
        Task<MessageResponse> SignUp(SignUpRequest signUpRequest);
        Task<RefreshResponse> Refresh(RefreshRequest refreshRequest);
        Task<MessageResponse> ResetPasswordEmail(EmailRequest passwordResetRequest);
        Task<MessageResponse> ResetPassword(PasswordResetRequest passwordResetRequest,string email, string token,DateTime time);

    }
}
