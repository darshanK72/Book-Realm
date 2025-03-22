# Use .NET 6 SDK for building the project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY . ./
RUN dotnet restore

# Build and publish the application
RUN dotnet publish -c Release -o /out

# Use .NET 6 runtime for final image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /out ./

# Expose the port (Render defaults to 10000)
EXPOSE 10000

# Run the executable instead of a DLL
CMD ["./Book_Realm_API.exe"]
