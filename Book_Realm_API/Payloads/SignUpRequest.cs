﻿namespace Book_Realm_API.Payloads
{
    public class SignUpRequest
    {
        public string Name {  get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
    }
}
