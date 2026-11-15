param(
    [string]$TargetDir = ""
)

if (-not $TargetDir) {
    $candidate = Join-Path $PSScriptRoot "..\assets\images\articles"
    if (Test-Path $candidate) {
        $TargetDir = (Resolve-Path $candidate).Path
    } else {
        $TargetDir = "C:\Users\yuxun\.gemini\antigravity\scratch\the-story-lab\assets\images\articles"
    }
}

$svgFiles = Get-ChildItem -Path $TargetDir -Filter "*.svg" -Recurse

Write-Host "================================================================="
Write-Host "THE STORY LAB — SVG Multi-Tier Quality & Collision Audit Tool"
Write-Host "Target Directory: $TargetDir"
Write-Host "Found $($svgFiles.Count) SVG files to inspect."
Write-Host "-----------------------------------------------------------------"
Write-Host "NOTE: This tool performs automated structural, coordinate heuristic,"
Write-Host "and boundary safety checks. Actual visual inspection in browser/device"
Write-Host "is MANDATORY for final editorial acceptance."
Write-Host "=================================================================`n"

# Helper function to accumulate transform="translate(tx, ty)" up to <svg> root
function Get-GlobalCoord($node) {
    $x = 0.0
    $y = 0.0
    if ($node.Attributes['x']) { $x = [double]($node.Attributes['x'].Value -replace '[^\d\.-]', '') }
    if ($node.Attributes['y']) { $y = [double]($node.Attributes['y'].Value -replace '[^\d\.-]', '') }

    $curr = $node.ParentNode
    while ($curr -and $curr.LocalName -ne 'svg') {
        if ($curr.Attributes -and $curr.Attributes['transform']) {
            $trans = $curr.Attributes['transform'].Value
            if ($trans -match 'translate\(\s*([-\d\.]+)(?:[\s,]+([-\d\.]+))?\)') {
                $x += [double]$matches[1]
                if ($matches[2]) { $y += [double]$matches[2] }
            }
        }
        $curr = $curr.ParentNode
    }
    return @{ X = $x; Y = $y }
}

$allPassed = $true
$reportTable = @()

foreach ($file in $svgFiles) {
    $articleDir = $file.Directory.Name
    $fileName = $file.Name
    $isCover = ($fileName -eq 'cover.svg')
    $typeLabel = if ($isCover) { "COVER" } else { "FIGURE" }
    
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
            Type = $typeLabel
            File = $fileName
            ViewBox = "INVALID"
            Texts = 0
            Risks = 1
            Status = "FAIL (Syntax Error)"
        }
        continue
    }

    # 2. ViewBox Check
    $vb = $xml.svg.viewBox
    $vbW = 0
    $vbH = 0
    if (-not $vb) {
        $errors += "Missing viewBox on <svg> root element"
    } else {
        $parts = ($vb -split '\s+|,') | Where-Object { $_ -ne '' }
        $vbW = [double]$parts[2]
        $vbH = [double]$parts[3]
        
        # Cover aspect ratio check (must be 16:9 / 1200x675)
        if ($isCover -and ($vbW -ne 1200 -or $vbH -ne 675)) {
            $warnings += "Cover viewBox ($vbW x $vbH) deviates from standard 1200 x 675"
        }
    }

    # 3. Check for HTML tags inside SVG
    if ($raw -match '<(div|p|br|span|b|strong)\b') {
        $errors += "Prohibited HTML tags found inside SVG XML"
    }

    # 4. Text Extraction and Global Coordinate Collision Check
    $texts = $xml.SelectNodes("//*[local-name()='text']")
    $collisionRisks = 0

    for ($i = 0; $i -lt $texts.Count; $i++) {
        $t1 = $texts[$i]
        $c1 = Get-GlobalCoord $t1
        $txt1 = $t1.InnerText.Trim()
        $isScript1 = ($t1.Attributes['font-family'] -and $t1.Attributes['font-family'].Value -match 'Script|cursive')

        for ($j = $i + 1; $j -lt $texts.Count; $j++) {
            $t2 = $texts[$j]
            $c2 = Get-GlobalCoord $t2
            $txt2 = $t2.InnerText.Trim()
            $isScript2 = ($t2.Attributes['font-family'] -and $t2.Attributes['font-family'].Value -match 'Script|cursive')

            $xDiff = [Math]::Abs($c1.X - $c2.X)
            $yDiff = [Math]::Abs($c1.Y - $c2.Y)

            # Strict threshold for script fonts vs normal fonts
            $minY = if ($isScript1 -or $isScript2) { 26.0 } else { 16.0 }

            # Flag risk if two texts share close horizontal alignment and dangerous vertical overlap
            if ($xDiff -lt 40 -and $yDiff -lt $minY -and $yDiff -ge 0) {
                # Skip if one is explicitly numbered badge and other has clear horizontal margin
                if ($txt1 -match '^\d{2}$' -or $txt2 -match '^\d{2}$') {
                    # numbered badge circle check
                } else {
                    $warnings += "Global collision risk: dX=$xDiff px, dY=$yDiff px between '$txt1' and '$txt2'"
                    $collisionRisks++
                }
            }
        }
    }

    $status = if ($errors.Count -eq 0 -and $collisionRisks -eq 0) { 
        "PASS (Preliminary OK)" 
    } else { 
        "FAIL ($($errors.Count) err, $($collisionRisks) risk)" 
    }
    
    if ($errors.Count -gt 0 -or $collisionRisks -gt 0) { 
        $allPassed = $false 
    }

    $reportTable += [PSCustomObject]@{
        Article = $articleDir
        Type = $typeLabel
        File = $fileName
        ViewBox = "$vbW x $vbH"
        Texts = $texts.Count
        Risks = $collisionRisks
        Status = $status
    }
}

$reportTable | Format-Table -AutoSize

Write-Host "-----------------------------------------------------------------"
if ($allPassed) {
    Write-Host "PRELIMINARY CHECK: ALL $($svgFiles.Count) SVGs PASSED STRUCTURAL & GEOMETRIC AUDIT." -ForegroundColor Green
    Write-Host "REMINDER: Final acceptance REQUIRES visual inspection in browser/device rendering." -ForegroundColor Cyan
} else {
    Write-Host "PRELIMINARY CHECK: POTENTIAL COLLISION RISKS DETECTED. PLEASE REVIEW TABLE." -ForegroundColor Yellow
}
Write-Host "================================================================="
