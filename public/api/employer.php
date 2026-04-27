<?php
define('SM_APP', true);
define('TO_EMAIL',   'info@sunkoshimanpower.com');
define('FROM_EMAIL', 'noreply@sunkoshimanpower.com');
define('SITE_NAME',  'Sunkoshi Manpower Service');

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['success'=>false]); exit; }

function clean(string $v): string { return htmlspecialchars(strip_tags(trim($v)), ENT_QUOTES, 'UTF-8'); }
function noNL(string $v): string  { return str_replace(["\r","\n","%0a","%0d"], '', $v); }
function row(string $l, string $v): string {
    if (!$v) return '';
    return "<tr><td style='padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;width:180px;vertical-align:top;'>$l</td><td style='padding:10px 0;border-bottom:1px solid #f1f5f9;color:#374151;'>$v</td></tr>";
}

$company   = clean($_POST['company_name']     ?? '');
$contact   = clean($_POST['contact_person']   ?? '');
$email     = trim($_POST['email']             ?? '');
$phone     = clean($_POST['phone']            ?? '');
$country   = clean($_POST['country']          ?? '');
$sector    = clean($_POST['sector']           ?? '');
$jobTitle  = clean($_POST['job_title']        ?? '');
$workers   = clean($_POST['workers_needed']   ?? '');
$salary    = clean($_POST['salary']           ?? '');
$depDate   = clean($_POST['deployment_date']  ?? '');
$benefits  = clean($_POST['benefits']         ?? '');
$reqs      = clean($_POST['requirements']     ?? '');

if (!$company || !$contact || !$phone || !$country || !$jobTitle || !$workers) { http_response_code(400); echo json_encode(['success'=>false,'message'=>'Required fields missing']); exit; }
$email   = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$replyTo = $email ?: FROM_EMAIL;

// ── Save to database ──────────────────────────────────────────────────────────
require_once __DIR__ . '/db.php';
try {
    $pdo->prepare("INSERT INTO employer_inquiries (company_name,contact_person,email,phone,country,sector,job_title,workers_needed,salary,deployment_date,benefits,requirements) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)")
        ->execute([$company,$contact,$email,$phone,$country,$sector,$jobTitle,$workers,$salary,$depDate,$benefits,$reqs]);
} catch (Exception $e) {}

// ── Send email ────────────────────────────────────────────────────────────────
$mailSubject = noNL("Employer: $jobTitle ($company) — " . SITE_NAME);
$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;"><tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
<tr><td style="background:#2B3675;padding:28px 36px;"><h2 style="margin:0;color:#C8A84B;font-size:1.2rem;">New Employer Requirement</h2></td></tr>
<tr><td style="padding:28px 36px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
' . row('Company',$company).row('Contact',$contact).row('Email',$email?:'—').row('Phone',$phone)
.row('Country',$country).row('Sector',$sector).row('Job Title',$jobTitle).row('Workers',$workers)
.row('Salary',$salary).row('Deploy Date',$depDate).row('Benefits',$benefits).row('Requirements',$reqs) . '
</table></td></tr>
<tr><td style="background:#f8fafc;padding:14px 36px;font-size:0.75rem;color:#94a3b8;border-top:1px solid #f1f5f9;">View in admin: /admin/</td></tr>
</table></td></tr></table></body></html>';

$headers = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\nFrom: " . SITE_NAME . " <" . FROM_EMAIL . ">\r\nReply-To: $replyTo\r\n";
$sent = mail(TO_EMAIL, $mailSubject, $body, $headers);
echo json_encode(['success' => (bool)$sent]);
