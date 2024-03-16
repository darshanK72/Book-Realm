using Book_Realm_API.Exceptions;
using Book_Realm_API.Payloads;
using Book_Realm_API.Repositories.AuthRepository;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("signin")]
        public async Task<ActionResult<SignInResponse>> SignIn([FromBody] SignInRequest signInRequest)
        {
            try
            {
                var signInResponse = await _authRepository.SignIn(signInRequest);
                return Ok(signInResponse);
            }
            catch (AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, $"{ex.Message}");
            }
        }

        [HttpPost("signup")]
        public async Task<ActionResult<MessageResponse>> SignUp([FromBody] SignUpRequest signUpRequest)
        {
            try
            {
                var signUpResponse = await _authRepository.SignUp(signUpRequest);
                return Ok(signUpResponse);
                
            }
            catch(AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
        }

        [HttpPost("google-signin")]
        public async Task<ActionResult<SignInResponse>> GoogleSignIn([FromBody] GoogleUser googleUser)
        {
            try
            {
                var signInResponse = await _authRepository.SignInWithGoogle(googleUser);
                return Ok(signInResponse);
            }
            catch (AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, $"{ex.Message}");
            }
        }

        [HttpPost("google-signup")]
        public async Task<ActionResult<MessageResponse>> GoogleSignUp(GoogleUser googleUser)
        {
            try
            {
                var signUpResponse = await _authRepository.SignUpWithGoogle(googleUser);
                return Ok(signUpResponse);

            }
            catch (AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
        }


        [HttpPost("refresh")]
        public async Task<ActionResult<RefreshResponse>> Refresh(RefreshRequest refreshRequest)
        {
            try
            {
                var refreshResponse = await _authRepository.Refresh(refreshRequest);
                return Ok(refreshResponse);

            }
            catch (AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
        }

        [HttpPost("password-reset-mail")]
        public async Task<ActionResult<MessageResponse>> PasswordResetEmail(EmailRequest emailRequest)
        {
            try
            {
                var response = await _authRepository.ResetPasswordEmail(emailRequest);
                return Ok(response);
            }
            catch(AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<MessageResponse>> ResetPassword([FromBody] PasswordResetRequest passwordResetRequest,[FromQuery] string email, [FromQuery] string token)
        {
            try
            {
                var response = await _authRepository.ResetPassword(passwordResetRequest,email,token,DateTime.Now);
                return Ok(response);
            }
            catch (AuthenticationException ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
        }
    }
}
