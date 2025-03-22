# Use official .NET 6 SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY . ./
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o /out

# Use a smaller runtime image for .NET 6
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /out ./

# Expose the port (Render uses port 10000 by default)
EXPOSE 10000

# Start the application
CMD ["dotnet", "Book_Realm_API.dll"]
