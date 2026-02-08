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
        git init
        git remote add origin $repo.Url
    } else {
        $remotes = git remote
        if ($remotes -contains "origin") {
            git remote set-url origin $repo.Url
        } else {
             git remote add origin $repo.Url
        }
    }

    git add .
    git commit -m "Upgrade project structure and code quality: Professional enhancements"
    git branch -M main
    git push -u origin main
    
    Set-Location ..
}
