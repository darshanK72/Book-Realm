# Book Realm

Book Realm is a comprehensive online platform designed for both readers and aspiring authors, featuring a handpicked selection of literary works and tools for authors to publish and manage their narratives.

## Project Structure

The repository is organized into three main components:

- **`Book_Realm_API`**: The backend RESTful API built with .NET 8.0.
- **`Book_Realm_UI`**: The main customer-facing frontend application built with Angular.
- **`Book_Partner_Portal_UI`**: The administrative portal for partners/authors built with Angular.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **[.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)**
- **[Node.js (LTS)](https://nodejs.org/)** and **npm**
- **[Angular CLI](https://angular.io/cli)** (`npm install -g @angular/cli`)
- **SQL Server** (LocalDB, Express, or Azure SQL)

---

## 🚀 Getting Started

### 1. Backend Setup (`Book_Realm_API`)

Navigate to the API directory:

```bash
cd Book_Realm_API
```

#### Restore Dependencies

```bash
dotnet restore
```

#### Configure User Secrets

The project uses sensitive configuration (like database connection strings and API keys) which should be stored in User Secrets for development.

Run the following commands to set up the required secrets:

```bash
# JWT Configuration
dotnet user-secrets set "Jwt:SecretKey" "<YOUR_JWT_SECRET>"

# Google Auth
dotnet user-secrets set "Google:ClientId" "<YOUR_GOOGLE_CLIENT_ID>"
dotnet user-secrets set "Google:ClientSecret" "<YOUR_GOOGLE_CLIENT_SECRET>"

# Email Configuration
dotnet user-secrets set "Email:From" "<YOUR_EMAIL>"
dotnet user-secrets set "Email:Password" "<YOUR_EMAIL_PASSWORD>"

# Database Connections
dotnet user-secrets set "ConnectionStrings:DefaultConnectionString" "Server=localhost;Database=bookrealm;User ID=sa;Password=<YOUR_PASSWORD>;TrustServerCertificate=True;"
dotnet user-secrets set "ConnectionStrings:AzureSQLConnectionString" "<YOUR_AZURE_CONNECTION_STRING>"

# Cloudinary (Image Hosting)
dotnet user-secrets set "Cloudinary:CloudName" "<YOUR_CLOUD_NAME>"
dotnet user-secrets set "Cloudinary:ApiKey" "<YOUR_API_KEY>"
dotnet user-secrets set "Cloudinary:ApiSecret" "<YOUR_API_SECRET>"
# Optional Folder paths (Defaults shown)
dotnet user-secrets set "Cloudinary:UserProfileFolder" "Book_Realm/User_Profiles"
dotnet user-secrets set "Cloudinary:BookFolder" "Book_Realm/Book_Images"
dotnet user-secrets set "Cloudinary:BannerFolder" "Book_Realm/Banners"
```

#### Database Setup

Apply the Entity Framework migrations to create the database schema:

```bash
dotnet ef database update
```

#### Run the API

```bash
dotnet run
```

The API will typically run on `https://localhost:7164` or `http://localhost:5204` (check the console output).

---

### 2. Frontend Setup (`Book_Realm_UI` & `Book_Partner_Portal_UI`)

The setup process is identical for both UI applications.

Navigate to the desired UI directory:

```bash
# For Main UI
cd Book_Realm_UI

# OR for Partner Portal
cd Book_Partner_Portal_UI
```

#### Install Dependencies

```bash
npm install
```

#### Run the Application

```bash
ng serve
```

- **Book_Realm_UI** typically runs on `http://localhost:4200`.
- **Book_Partner_Portal_UI** typically runs on `http://localhost:4200` (specify a different port if running both: `ng serve --port 4201`).

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.
