using Book_Realm_API.Exceptions;
using Book_Realm_API.Payloads;
using Book_Realm_API.Repositories.Auth;
using Microsoft.AspNetCore.Mvc;

namespace Book_Realm_API.Controllers
{
    [Route("api/autn")]
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
        public async Task<ActionResult<SignUpResponse>> SignUp([FromBody] SignUpRequest signUpRequest)
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
    }
}
