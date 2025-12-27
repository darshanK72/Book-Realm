# Use official .NET 8 SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY . ./
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o /out

# Use a smaller runtime image for .NET 8
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /out ./

# Render provides the PORT environment variable. 
# We'll default to 80 if it's not provided.
ENV PORT=80
ENV ASPNETCORE_URLS=http://+:${PORT}
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "Book_Realm_API.dll"]
