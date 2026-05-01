<?php
define('SM_APP', true);

$formPath = dirname(__DIR__) . '/downloads/application-form.html';
if (!file_exists($formPath)) {
    http_response_code(404);
    echo 'Form file not found.';
    exit;
}

$html = file_get_contents($formPath);

// Embed the real logo as base64 so wkhtmltopdf doesn't need network access
$logoPath = dirname(__DIR__) . '/images/logo.png';
if (file_exists($logoPath)) {
    $logoB64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
    $html = preg_replace('/src="\/images\/logo\.png"/', 'src="' . $logoB64 . '"', $html);
}

// Remove the print bar (not needed in PDF)
$html = preg_replace('/<div class="download-bar no-print">.*?<\/div>/s', '', $html);

$filename = 'Sunkoshi-Manpower-Application-Form';

// Try wkhtmltopdf
$wkhtmltopdf = null;
$candidates = [
    '/usr/local/bin/wkhtmltopdf',
    '/usr/bin/wkhtmltopdf',
    trim(shell_exec('which wkhtmltopdf 2>/dev/null')),
    $_SERVER['HOME'] . '/bin/wkhtmltopdf',
];
foreach ($candidates as $c) {
    if ($c && is_executable($c)) { $wkhtmltopdf = $c; break; }
}

if ($wkhtmltopdf) {
    $tmpHtml = sys_get_temp_dir() . '/sunkoshi_form_' . uniqid() . '.html';
    $tmpPdf  = sys_get_temp_dir() . '/sunkoshi_form_' . uniqid() . '.pdf';
    file_put_contents($tmpHtml, $html);

    $cmd = escapeshellcmd($wkhtmltopdf)
        . ' --quiet --disable-javascript --enable-local-file-access'
        . ' --page-size A4 --orientation Portrait'
        . ' --margin-top 0mm --margin-bottom 0mm --margin-left 0mm --margin-right 0mm'
        . ' --disable-smart-shrinking'
        . ' ' . escapeshellarg($tmpHtml)
        . ' ' . escapeshellarg($tmpPdf);

    exec($cmd, $out, $code);

    if ($code === 0 && file_exists($tmpPdf) && filesize($tmpPdf) > 0) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . $filename . '.pdf"');
        header('Content-Length: ' . filesize($tmpPdf));
        readfile($tmpPdf);
        @unlink($tmpHtml);
        @unlink($tmpPdf);
        exit;
    }
    @unlink($tmpHtml);
    @unlink($tmpPdf);
}

// Fallback: serve the HTML file as a download (user can open + print to PDF)
header('Content-Type: text/html; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '.html"');
header('Content-Length: ' . strlen($html));
echo $html;
