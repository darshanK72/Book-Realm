# Use official .NET SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY . ./
RUN dotnet restore

# Build the application
RUN dotnet publish -c Release -o /out

# Use a smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy built files from the build stage
COPY --from=build /out ./

# Expose the port (Render uses port 10000 by default, so we expose it)
EXPOSE 10000

# Start the application
CMD ["dotnet", "BookRealm.dll"]
