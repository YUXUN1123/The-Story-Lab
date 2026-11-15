param(
    [string]$TargetDir = ""
)

if (-not $TargetDir) {
    $scriptBase = Split-Path -Parent $PSScriptRoot
    $candidate = Join-Path $PSScriptRoot "..\assets\images\articles"
    if (Test-Path $candidate) {
        $TargetDir = (Resolve-Path $candidate).Path
    } else {
        $TargetDir = "C:\Users\yuxun\.gemini\antigravity\scratch\the-story-lab\assets\images\articles"
    }
}

$svgFiles = Get-ChildItem -Path $TargetDir -Filter "*.svg" -Recurse

Write-Host "================================================================="
Write-Host "THE STORY LAB — SVG Visual Quality & Collision Audit Tool"
Write-Host "Target Directory: $TargetDir"
Write-Host "Found $($svgFiles.Count) SVG files to inspect."
Write-Host "=================================================================`n"

$allPassed = $true
$reportTable = @()

foreach ($file in $svgFiles) {
    $articleDir = $file.Directory.Name
    $fileName = $file.Name
    $raw = Get-Content $file.FullName -Raw -Encoding UTF8

    $errors = @()
    $warnings = @()

    # 1. XML Parse Check
    try {
        [xml]$xml = $raw
    } catch {
        $errors += "XML Parse Failure: $($_.Exception.Message)"
        $allPassed = $false
        $reportTable += [PSCustomObject]@{
            Article = $articleDir
            File = $fileName
            ViewBox = "INVALID"
            Texts = 0
            Collisions = 1
            Status = "FAIL"
        }
        continue
    }

    # 2. ViewBox Check
    $vb = $xml.svg.viewBox
    if (-not $vb) {
        $errors += "Missing viewBox on <svg> root element"
        $vbW = 1000
        $vbH = 600
    } else {
        $parts = ($vb -split '\s+|,') | Where-Object { $_ -ne '' }
        $vbW = [double]$parts[2]
        $vbH = [double]$parts[3]
    }

    # 3. Check for HTML tags inside SVG
    if ($raw -match '<(div|p|br|span|b|strong)\b') {
        $errors += "Prohibited HTML tags found inside SVG XML"
    }

    # 4. Text and Tspan Collision Check
    $texts = $xml.SelectNodes("//*[local-name()='text']")
    $collisionCount = 0

    for ($i = 0; $i -lt $texts.Count; $i++) {
        $t1 = $texts[$i]
        $y1 = 0.0
        if ($t1.Attributes['y']) { $y1 = [double]($t1.Attributes['y'].Value -replace '[^\d\.-]', '') }
        $x1 = 0.0
        if ($t1.Attributes['x']) { $x1 = [double]($t1.Attributes['x'].Value -replace '[^\d\.-]', '') }
        $size1 = 12.0
        if ($t1.Attributes['font-size']) { $size1 = [double]($t1.Attributes['font-size'].Value -replace '[^\d\.]', '') }

        for ($j = $i + 1; $j -lt $texts.Count; $j++) {
            $t2 = $texts[$j]
            $y2 = 0.0
            if ($t2.Attributes['y']) { $y2 = [double]($t2.Attributes['y'].Value -replace '[^\d\.-]', '') }
            $x2 = 0.0
            if ($t2.Attributes['x']) { $x2 = [double]($t2.Attributes['x'].Value -replace '[^\d\.-]', '') }

            if ($t1.ParentNode -eq $t2.ParentNode) {
                $yDiff = [Math]::Abs($y1 - $y2)
                $xDiff = [Math]::Abs($x1 - $x2)

                # Flag collision if text baselines are dangerously close with overlapping X
                if ($yDiff -gt 0 -and $yDiff -lt 18 -and $xDiff -lt 50) {
                    $warnings += "Collision risk: Y-diff $yDiff px between '$($t1.InnerText.Trim())' and '$($t2.InnerText.Trim())'"
                    $collisionCount++
                }
            }
        }
    }

    $status = if ($errors.Count -eq 0 -and $collisionCount -eq 0) { "PASS" } else { "FAIL" }
    if ($status -eq "FAIL") { $allPassed = $false }

    $reportTable += [PSCustomObject]@{
        Article = $articleDir
        File = $fileName
        ViewBox = "$vbW x $vbH"
        Texts = $texts.Count
        Collisions = $collisionCount
        Status = $status
    }
}

$reportTable | Format-Table -AutoSize

Write-Host "-----------------------------------------------------------------"
if ($allPassed) {
    Write-Host "RESULT: ALL $($svgFiles.Count) SVGs PASSED QUALITY & COLLISION AUDIT (100% ZERO DEFECTS)." -ForegroundColor Green
} else {
    Write-Host "RESULT: ISSUES DETECTED. PLEASE REVIEW REPORT TABLE." -ForegroundColor Red
}
Write-Host "================================================================="
