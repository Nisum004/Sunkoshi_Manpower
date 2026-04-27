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

$fullName   = clean($_POST['full_name']          ?? '');
$dob        = clean($_POST['dob']                ?? '');
$phone      = clean($_POST['phone']              ?? '');
$email      = trim($_POST['email']               ?? '');
$district   = clean($_POST['district']           ?? '');
$education  = clean($_POST['education']          ?? '');
$country    = clean($_POST['preferred_country']  ?? '');
$category   = clean($_POST['job_category']       ?? '');
$jobRef     = clean($_POST['applying_for_job']   ?? '');
$experience = clean($_POST['experience']         ?? '');
$passport   = clean($_POST['passport_status']    ?? '');
$expDetails = clean($_POST['experience_details'] ?? '');

if (!$fullName || !$phone || !$district || !$country || !$category || !$passport) {
    http_response_code(400); echo json_encode(['success'=>false,'message'=>'Required fields missing']); exit;
}
$email   = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$replyTo = $email ?: FROM_EMAIL;

// ── Save to database ──────────────────────────────────────────────────────────
require_once __DIR__ . '/db.php';
try {
    $ins = $pdo->prepare("INSERT INTO applications (full_name,dob,phone,email,district,education,preferred_country,job_category,job_ref,experience,passport_status,experience_details) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    $ins->execute([$fullName,$dob,$phone,$email,$district,$education,$country,$category,$jobRef,$experience,$passport,$expDetails]);
    $newId = $pdo->lastInsertId();
    $refNo = 'APP-' . date('Y') . '-' . str_pad($newId, 4, '0', STR_PAD_LEFT);
    $pdo->prepare("UPDATE applications SET ref_no = ? WHERE id = ?")->execute([$refNo, $newId]);
} catch (Exception $e) { $refNo = ''; }

// ── Send email ────────────────────────────────────────────────────────────────
$subject = noNL('Application: ' . $fullName . ' → ' . $country . ' (' . ($refNo ?: 'pending') . ') — ' . SITE_NAME);
$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;"><tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
<tr><td style="background:#2B3675;padding:28px 36px;">
  <h2 style="margin:0;color:#C8A84B;font-size:1.2rem;">New Job Seeker Registration</h2>
  <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:0.8rem;">Ref: ' . ($refNo ?: 'N/A') . ' — ' . SITE_NAME . '</p>
</td></tr>
<tr><td style="padding:28px 36px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ' . row('Full Name',$fullName).row('Date of Birth',$dob).row('Phone',$phone).row('Email',$email?:'—')
    .row('District',$district).row('Education',$education).row('Preferred Country',$country)
    .row('Job Category',$category).row('Job Ref',$jobRef?:'General').row('Experience',$experience)
    .row('Passport',$passport).row('Skills / Details',$expDetails) . '
  </table>
</td></tr>
<tr><td style="background:#f8fafc;padding:14px 36px;font-size:0.75rem;color:#94a3b8;border-top:1px solid #f1f5f9;">
  Submitted from sunkoshimanpower.com · View in admin panel: /admin/
</td></tr>
</table></td></tr></table></body></html>';

$headers  = "MIME-Version: 1.0\r\nContent-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . SITE_NAME . " <" . FROM_EMAIL . ">\r\nReply-To: $replyTo\r\n";
$sent = mail(TO_EMAIL, $subject, $body, $headers);

echo json_encode(['success' => (bool)$sent || !empty($refNo), 'ref' => $refNo]);
