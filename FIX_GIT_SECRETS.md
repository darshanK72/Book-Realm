# Book Realm - Fixing Git Push Secret Detection Issue

## Problem
GitHub blocked your push because it detected secrets in `appsettings.json`:
- Google OAuth Client ID and Secret
- Database password
- JWT secret key
- Email password
- Cloudinary API credentials

## Solution

### Step 1: Remove the problematic commit

```bash
cd /home/darshan/SDE/Projects/Book-Realm
git reset --soft HEAD~1
```

This will undo the last commit but keep your changes staged.

### Step 2: Update .gitignore

The `.gitignore` file has been created in `Book_Realm_API/` to exclude `appsettings.json`.

### Step 3: Remove appsettings.json from git tracking

```bash
cd Book_Realm_API
git rm --cached appsettings.json
```

### Step 4: Use the template file

A template file `appsettings.template.json` has been created with placeholder values. This should be committed to git.

### Step 5: Keep your actual appsettings.json locally

Your current `appsettings.json` with real values will stay on your machine but won't be tracked by git.

### Step 6: Commit the changes

```bash
cd /home/darshan/SDE/Projects/Book-Realm
git add Book_Realm_API/.gitignore
git add Book_Realm_API/appsettings.template.json
git add .
git commit -m "feat: Add home page modernization features and secure sensitive configuration

- Implement large banner component with NgRx integration
- Add category grid, featured collections, trending sections
- Create newsletter subscription with validation
- Add trust indicators component
- Enhance hero section with overlay and CTA buttons
- Secure appsettings.json by moving to template
- Update .gitignore to exclude sensitive files"
```

### Step 7: Push to GitHub

```bash
git push
```

## Alternative: Allow the secrets (NOT RECOMMENDED)

If you want to allow these specific secrets (not recommended for production):
1. Visit the URLs provided in the error message
2. Click "Allow secret" for each one

However, this exposes your credentials publicly. It's better to use the solution above.

## For Team Members

When cloning the repository, team members should:
1. Copy `appsettings.template.json` to `appsettings.json`
2. Fill in their own credentials
3. Never commit `appsettings.json`

## Better Practice: Use User Secrets (Optional)

For development, you can use .NET User Secrets:

```bash
cd Book_Realm_API
dotnet user-secrets init
dotnet user-secrets set "Google:ClientId" "your-client-id"
dotnet user-secrets set "Google:ClientSecret" "your-client-secret"
# ... add other secrets
```

This stores secrets outside your project directory.
