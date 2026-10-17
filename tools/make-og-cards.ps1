# Regenerates the Open Graph social cards in docs/assets/.

# DEV-ONLY. The committed PNGs are the source of truth; this script exists so
# they can be reproduced rather than being opaque binaries nobody can change.
#
# It uses System.Drawing, so it runs on Windows with Windows PowerShell 5.1 or
# later. Contributors on other platforms do not need it unless they are
# changing a card, and a card change is a pull request like any other.
#
#   powershell -ExecutionPolicy Bypass -File tools/make-og-cards.ps1
#
# No card ever contains anything operational. They carry a title, one line of
# copy, the domain, and the non-affiliation line.

Add-Type -AssemblyName System.Drawing

$Repo   = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Assets = Join-Path $Repo 'docs\assets'
$W = 1200
$H = 630

# page-id | title | subtitle
$Cards = @(
    @{ Id = 'default';    Title = 'Anime Array';   Sub = 'Free AI tools for anime fans.' }
    @{ Id = 'about';      Title = 'About';          Sub = 'Independent, free, funded by advertising.' }
    @{ Id = 'products';   Title = 'Products';       Sub = 'Roleplay, Otaku AI, AniPick, Vision AI.' }
    @{ Id = 'characters'; Title = 'Characters';     Sub = 'Twelve characters, five series, one roster.' }
    @{ Id = 'technology'; Title = 'Technology';     Sub = 'How the platform is built, and why.' }
    @{ Id = 'faq';        Title = 'FAQ';            Sub = 'The questions people actually ask.' }
    @{ Id = 'policies';   Title = 'Policies';       Sub = 'Copyright, characters and non-affiliation.' }
)

function New-Font([single]$size, [System.Drawing.FontStyle]$style) {
    try   { New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
    catch { New-Object System.Drawing.Font('Arial', $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
}

function New-Card([string]$id, [string]$title, [string]$sub) {
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $brand = [System.Drawing.Color]::FromArgb(179, 18, 60)

    # Background wash
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point 0, 0),
        (New-Object System.Drawing.Point $W, $H),
        [System.Drawing.Color]::FromArgb(20, 24, 34),
        [System.Drawing.Color]::FromArgb(9, 11, 16))
    $g.FillRectangle($bg, 0, 0, $W, $H)
    $bg.Dispose()

    # Bottom-right geometric block in the brand colour
    $glow = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point 820, 630),
        (New-Object System.Drawing.Point 1200, 300),
        [System.Drawing.Color]::FromArgb(70, 179, 18, 60),
        [System.Drawing.Color]::FromArgb(0, 179, 18, 60))
    $g.FillRectangle($glow, 700, 200, 500, 430)
    $glow.Dispose()

    # Left accent bar
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $brand), 0, 0, 16, $H)

    # Small rule above the title
    $rule = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(70, 255, 255, 255))
    $g.FillRectangle($rule, 84, 150, 150, 4)
    $rule.Dispose()

    # Eyebrow: the brand, always
    $fE = New-Font 26 'Bold'
    $bE = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150, 165, 185))
    $g.DrawString('ANIME ARRAY', $fE, $bE, (New-Object System.Drawing.PointF 84, 106))
    $bE.Dispose(); $fE.Dispose()

    # Page title, scaled down when long so it never overruns
    $tSize = if ($title.Length -gt 16) { 84 } elseif ($title.Length -gt 10) { 96 } else { 108 }
    $fT = New-Font $tSize 'Bold'
    $bT = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255))
    $g.DrawString($title, $fT, $bT, (New-Object System.Drawing.PointF 80, 186))
    $bT.Dispose(); $fT.Dispose()

    # Accent underline
    $g.FillRectangle((New-Object System.Drawing.SolidBrush $brand), 84, 322, 96, 5)

    # Subtitle
    $fS = New-Font 38 'Regular'
    $bS = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(228, 232, 240))
    $g.DrawString($sub, $fS, $bS, (New-Object System.Drawing.PointF 84, 352))
    $bS.Dispose(); $fS.Dispose()

    # Domain
    $fD = New-Font 30 'Bold'
    $bD = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 130, 170))
    $g.DrawString('animearray.site', $fD, $bD, (New-Object System.Drawing.PointF 84, 506))
    $bD.Dispose(); $fD.Dispose()

    # Non-affiliation line, on every card without exception
    $fN = New-Font 22 'Regular'
    $bN = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150, 160, 175))
    $g.DrawString('Independent fan project. Hosts no video. Not affiliated with any studio.', $fN, $bN, (New-Object System.Drawing.PointF 84, 558))
    $bN.Dispose(); $fN.Dispose()

    $g.Flush(); $g.Dispose()

    $out = Join-Path $Assets ("og-$id.png")
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    $kb = [math]::Round((Get-Item $out).Length / 1KB, 1)
    Write-Output ("  {0,-22} {1,6} KB" -f "og-$id.png", $kb)
}

Write-Output 'Generating social cards:'
foreach ($c in $Cards) { New-Card $c.Id $c.Title $c.Sub }
Write-Output "Done. Written to $Assets"