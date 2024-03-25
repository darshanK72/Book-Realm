using Book_Realm_API.Models;
using Microsoft.EntityFrameworkCore;
using Book_Realm_API;
using Book_Realm_API.Utils.MappingHelper;
using Book_Realm_API.Utils.JwtHelper;
using Book_Realm_API.Utils.PasswordHelper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Book_Realm_API.Repositories.UserRepository;
using Book_Realm_API.Repositories.AuthRepository;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Book_Realm_API.Repositories.RoleRepository;
using Book_Realm_API.Repositories.AddressRepository;
using Book_Realm_API.Repositories.BookRepository;
using Book_Realm_API.Utils.EmailHelper;
using Book_Realm_API.Repositories.GenreRepository;
using Book_Realm_API.Repositories.SubgenreRepository;
using Book_Realm_API.Utils.ImageHelper;
using Book_Realm_API.Repositories.ImageRepository;
using Book_Realm_API.Repositories.TagRepository;
using Book_Realm_API.Repositories.BannerRepository;
using Book_Realm_API.Repositories.ReviewRespository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy", builder =>
    {
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
       .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<BookRealmDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };
    })
   .AddGoogle(options =>
   {
       options.ClientId = builder.Configuration["Google:ClientId"];
       options.ClientSecret = builder.Configuration["Google:ClientSecret"];
   });

builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(
        JwtBearerDefaults.AuthenticationScheme)
            .RequireAuthenticatedUser()
            .Build();
});

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IGenreRepository,GenreRepository>();
builder.Services.AddScoped<ISubgenreRepository,SubgenreRepository>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IBannerRepository, BannerRepository>();

builder.Services.AddScoped<IMappingHelper,MappingHelper>();
builder.Services.AddScoped<ITokenHelper, TokenHelper>();
builder.Services.AddScoped<IPasswordHelper, PasswordHelper>();
builder.Services.AddScoped<IEmailHelper,EmailHelper>();
builder.Services.AddScoped<IImageHelper, ImageHelper>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("MyPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
