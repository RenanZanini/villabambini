$files = git ls-files site/public/assets/marthie/ | Where-Object { $_ -match "menino" }
foreach ($f in $files) {
    # Check if it starts with lowercase 'm'
    if ($f -match "/menino") {
        $correct = $f -replace "/menino", "/Menino"
        Write-Host "Renaming $f to $correct"
        git mv $f "$f.tmp"
        git mv "$f.tmp" $correct
    }
}
