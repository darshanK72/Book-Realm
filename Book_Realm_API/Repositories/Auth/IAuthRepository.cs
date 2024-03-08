﻿using Book_Realm_API.Models;
using Book_Realm_API.Payloads;

namespace Book_Realm_API.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<SignInResponse> SignIn(SignInRequest signInRequest);
        Task<SignUpResponse> SignUp(SignUpRequest signUpRequest);
    }
}
