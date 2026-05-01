<?php
// Server-side PDF generation using wkhtmltopdf (WebKit-based, exact browser rendering)
// Falls back to 501 → client-side print dialog if binary is unavailable
set_time_limit(60);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!$body || empty($body['html'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'No HTML provided']);
    exit;
}

$html     = $body['html'];
$filename = isset($body['filename']) ? $body['filename'] : 'Sunkoshi_Biodata';
$filename = preg_replace('/[^A-Za-z0-9_\-]/', '_', $filename);
if (!$filename) $filename = 'Sunkoshi_Biodata';

// 2 MB limit
if (strlen($html) > 2097152) {
    http_response_code(413);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Input too large']);
    exit;
}

// Embed logo as base64 so wkhtmltopdf needs no network call for images
$docRoot  = rtrim($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__), '/');
$logoPath = $docRoot . '/images/logo.png';
if (file_exists($logoPath)) {
    $logoB64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath));
    // Replace any absolute-URL or root-relative logo src
    $html = preg_replace('/src="[^"]*?logo\.png"/', 'src="' . $logoB64 . '"', $html);
}

$doc = '<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<style>
  * { box-sizing:border-box; margin:0; padding:0;
      -webkit-print-color-adjust:exact; print-color-adjust:exact; color-adjust:exact; }
  html, body { width:210mm; background:#fff; }
  @page { size:A4 portrait; margin:0; }
</style>
</head><body>' . $html . '</body></html>';

// Locate wkhtmltopdf binary
$wk = '';
$disabled = function_exists('ini_get') ? array_map('trim', explode(',', ini_get('disable_functions'))) : [];

if (!in_array('exec', $disabled) && function_exists('exec')) {
    $out = [];
    @exec('which wkhtmltopdf 2>/dev/null', $out);
    if (!empty($out[0]) && @is_executable($out[0])) {
        $wk = trim($out[0]);
    }
}

if (!$wk) {
    $candidates = [
        '/usr/local/bin/wkhtmltopdf',
        '/usr/bin/wkhtmltopdf',
        '/opt/wkhtmltopdf/bin/wkhtmltopdf',
        '/home/' . get_current_user() . '/bin/wkhtmltopdf',
        '/home/' . get_current_user() . '/local/bin/wkhtmltopdf',
    ];
    foreach ($candidates as $p) {
        if (@is_executable($p)) { $wk = $p; break; }
    }
}

if (!$wk || in_array('exec', $disabled)) {
    http_response_code(501);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'wkhtmltopdf not available on this server']);
    exit;
}

// Write to temp files
$tmpHtml = tempnam(sys_get_temp_dir(), 'smp_') . '.html';
$tmpPdf  = tempnam(sys_get_temp_dir(), 'smp_') . '.pdf';
file_put_contents($tmpHtml, $doc);

$cmd = escapeshellarg($wk)
     . ' --quiet'
     . ' --disable-javascript'
     . ' --page-size A4'
     . ' --disable-smart-shrinking'
     . ' --margin-top 0mm --margin-right 0mm --margin-bottom 0mm --margin-left 0mm'
     . ' --zoom 1'
     . ' ' . escapeshellarg($tmpHtml)
     . ' ' . escapeshellarg($tmpPdf)
     . ' 2>&1';

$output = []; $code = 0;
exec($cmd, $output, $code);

if ($code === 0 && @filesize($tmpPdf) > 0) {
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $filename . '.pdf"');
    header('Content-Length: ' . filesize($tmpPdf));
    header('Cache-Control: no-store');
    readfile($tmpPdf);
    @unlink($tmpHtml);
    @unlink($tmpPdf);
    exit;
}

@unlink($tmpHtml);
@unlink($tmpPdf);
http_response_code(500);
header('Content-Type: application/json');
echo json_encode([
    'error'  => 'PDF generation failed',
    'code'   => $code,
    'output' => implode("\n", array_slice($output, 0, 10)),
]);
