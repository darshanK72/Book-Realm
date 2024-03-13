namespace Book_Realm_Server_API.Exceptions
{
    public class AuthenticationException : Exception
    {
        public int StatusCode { get; set; }
        
        public AuthenticationException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }

        public AuthenticationException(int statusCode, string message, Exception innerException) : base(message, innerException)
        {
            StatusCode = statusCode;
        }
    }
}
