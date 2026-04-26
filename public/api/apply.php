<?php
// ─── Configuration ────────────────────────────────────────────────────────────
define('TO_EMAIL',   'info@sunkoshimanpower.com');
define('FROM_EMAIL', 'noreply@sunkoshimanpower.com');
define('SITE_NAME',  'Sunkoshi Manpower Service');

// ─── Bootstrap ───────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}
function noNewlines(string $val): string {
    return str_replace(["\r", "\n", "%0a", "%0d"], '', $val);
}
function row(string $label, string $val): string {
    if (!$val) return '';
    return '<tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;width:180px;vertical-align:top;">' . $label . '</td>
      <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#374151;">' . $val . '</td>
    </tr>';
}

// ─── Collect & validate ───────────────────────────────────────────────────────
$fullName    = clean($_POST['full_name']          ?? '');
$dob         = clean($_POST['dob']                ?? '');
$phone       = clean($_POST['phone']              ?? '');
$email       = trim($_POST['email']               ?? '');
$district    = clean($_POST['district']           ?? '');
$education   = clean($_POST['education']          ?? '');
$country     = clean($_POST['preferred_country']  ?? '');
$category    = clean($_POST['job_category']       ?? '');
$jobRef      = clean($_POST['applying_for_job']   ?? '');
$experience  = clean($_POST['experience']         ?? '');
$passport    = clean($_POST['passport_status']    ?? '');
$expDetails  = clean($_POST['experience_details'] ?? '');

if (!$fullName || !$phone || !$district || !$country || !$category || !$passport) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

$email   = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$replyTo = $email ?: FROM_EMAIL;

// ─── Build email ──────────────────────────────────────────────────────────────
$mailSubject = noNewlines('Job Seeker Registration: ' . $fullName . ' — ' . SITE_NAME);

$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="background:#2B3675;padding:28px 36px;">
        <h2 style="margin:0;color:#C8A84B;font-size:1.3rem;">New Job Seeker Registration</h2>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:0.82rem;">' . SITE_NAME . ' — sunkoshimanpower.com</p>
      </td></tr>
      <tr><td style="padding:28px 36px 8px;">
        <p style="margin:0 0 20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Personal Information</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ' . row('Full Name',   $fullName)
            . row('Date of Birth', $dob)
            . row('Phone / WhatsApp', $phone)
            . row('Email', $email ?: '—')
            . row('District / Province', $district)
            . row('Education Level', $education) . '
        </table>
      </td></tr>
      <tr><td style="padding:8px 36px 8px;">
        <p style="margin:16px 0 20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Work Preference</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ' . row('Preferred Country', $country)
            . row('Job Category', $category)
            . row('Applying For Job', $jobRef ?: 'General Registration')
            . row('Experience', $experience)
            . row('Passport Status', $passport)
            . row('Skills / Details', $expDetails) . '
        </table>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:16px 36px;font-size:0.75rem;color:#94a3b8;border-top:1px solid #f1f5f9;margin-top:16px;">
        Submitted from sunkoshimanpower.com job seeker registration form.
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>';

// ─── Send ─────────────────────────────────────────────────────────────────────
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . SITE_NAME . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: " . $replyTo . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = mail(TO_EMAIL, $mailSubject, $body, $headers);

echo json_encode(['success' => (bool)$sent, 'message' => $sent ? 'Sent' : 'Mail failed']);
