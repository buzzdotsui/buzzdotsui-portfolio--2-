$repos = @(
    @{ Path = "AutoRecon"; Url = "https://github.com/buzzdotsui/Auto-Recon.git" },
    @{ Path = "InfraUI"; Url = "https://github.com/buzzdotsui/Infra-UI.git" },
    @{ Path = "LogSentinel"; Url = "https://github.com/buzzdotsui/LogSentinel.git" },
    @{ Path = "Project-Cipher"; Url = "https://github.com/buzzdotsui/Project-Cipher.git" }
)

foreach ($repo in $repos) {
    Write-Host "Processing $($repo.Path)..."
    Set-Location $repo.Path
    
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing git..."
        git init
    }
    
    # Check if remote exists
    $remotes = git remote
    if ($remotes -contains "origin") {
        Write-Host "Setting remote origin..."
        git remote set-url origin $repo.Url
    } else {
        Write-Host "Adding remote origin..."
        git remote add origin $repo.Url
    }
    
    Write-Host "Adding files..."
    git add .
    
    Write-Host "Committing..."
    git commit -m "Initial commit"
    
    Write-Host "Branching to main..."
    git branch -M main
    
    Write-Host "Pushing to origin..."
    git push -u origin main
    
    Set-Location ..
    Write-Host "Done with $($repo.Path)`n"
}
