Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "d:\asutosh\newwebsite\temp_catalog.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("word/document.xml")
if ($null -ne $entry) {
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Close()
    $text = $xml -replace '<w:p[^>]*>', "`n" -replace '<[^>]+>', ''
    Set-Content -Path "d:\asutosh\newwebsite\extracted_catalog.txt" -Value $text
}
$zip.Dispose()
