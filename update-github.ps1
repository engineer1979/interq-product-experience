# PowerShell script to update GitHub repository
# Run this script in PowerShell to commit and push your changes

Write-Host "Updating GitHub repository..." -ForegroundColor Green

# Check git status
git status

# Add all changes
git add .

# Commit with message
$commitMessage = "Typography update: Enhanced visibility and contrast across all pages"
git commit -m "$commitMessage"

# Push to GitHub
git push origin main

Write-Host "GitHub repository updated successfully!" -ForegroundColor Green
Write-Host "Visit: https://github.com/engineer1979/interq-product-experience" -ForegroundColor Cyan