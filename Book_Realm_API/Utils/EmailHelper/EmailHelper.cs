using Book_Realm_API.Payloads;
using MailKit.Net.Smtp;
using MimeKit;

namespace Book_Realm_API.Utils.EmailHelper
{
    public class EmailHelper : IEmailHelper
    {
        private readonly IConfiguration _configuration;

        public EmailHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmail(Email email)
        {
            var emailMessage = new MimeMessage();

            var from = _configuration["Email:From"];
            emailMessage.From.Add(new MailboxAddress("Book Realm", from));
            emailMessage.To.Add(new MailboxAddress(email.To, email.To));
            emailMessage.Subject = email.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = email.Body
            };

            using(var smtpClient = new SmtpClient())
            {
                try
                {
                    await smtpClient.ConnectAsync(_configuration["Email:Server"], Convert.ToInt32(_configuration["Email:Port"]), true);
                    await smtpClient.AuthenticateAsync(_configuration["Email:From"], _configuration["Email:Password"]);
                    await smtpClient.SendAsync(emailMessage);
                }
                catch(Exception ex)
                {
                    throw new Exception(ex.Message);
                }
                finally
                {
                    await smtpClient.DisconnectAsync(true);
                    smtpClient.Dispose();
                }
            }
        }

        public string CreateMailBody(string email,string token)
        {
            string resetLink = $"https://localhost:7175/api/reset-password?email={email}&token={token}";

            string body = $@"
                <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        }}
                        h2 {{
                            color: #333;
                        }}
                        p {{
                            margin-bottom: 20px;
                        }}
                        a {{
                            color: #fff;
                            text-decoration: none;
                            background-color: #007bff;
                            padding: 10px 20px;
                            border-radius: 5px;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Password Reset</h2>
                        <p>Hello {email},</p>
                        <p>You recently requested to reset your password. To reset your password, please click the link below:</p>
                        <p><a href='{resetLink}'>Reset Password</a></p>
                        <p>If you did not request a password reset, please ignore this email.</p>
                    </div>
                </body>
                </html>
            ";

            return body;
        }
    }
}
