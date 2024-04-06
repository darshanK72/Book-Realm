using Book_Realm_API.Models;
using Book_Realm_API.Payloads;

namespace Book_Realm_API.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        Task<UserExistsResponse> CheckIfUserExists(GoogleUser user);
        Task<SignInResponse> SignIn(SignInRequest signInRequest);
        Task<SignInResponse> SignInWithGoogle(GoogleUser googleUser);
        Task<MessageResponse> SignUp(SignUpRequest signUpRequest);
        Task<SignInResponse> SignUpWithGoogle(GoogleUser googleUser);
        Task<RefreshResponse> Refresh(RefreshRequest refreshRequest);
        Task<MessageResponse> ResetPasswordEmail(EmailRequest passwordResetRequest);
        Task<MessageResponse> ResetPassword(PasswordResetRequest passwordResetRequest,string email, string token,DateTime time);

    }
}
