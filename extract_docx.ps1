Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "d:\asutosh\newwebsite\AeroSpark_Academy_Course_Fees_and_Combo_Offers.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("word/document.xml")
if ($null -ne $entry) {
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Close()
    # Basic XML tag stripping
    $text = $xml -replace '<w:p[^>]*>', "`n" -replace '<[^>]+>', ''
    Write-Output $text
} else {
    Write-Error "Could not find word/document.xml"
}
$zip.Dispose()
