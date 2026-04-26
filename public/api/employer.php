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
$company        = clean($_POST['company_name']     ?? '');
$contactPerson  = clean($_POST['contact_person']   ?? '');
$email          = trim($_POST['email']             ?? '');
$phone          = clean($_POST['phone']            ?? '');
$country        = clean($_POST['country']          ?? '');
$sector         = clean($_POST['sector']           ?? '');
$jobTitle       = clean($_POST['job_title']        ?? '');
$workersNeeded  = clean($_POST['workers_needed']   ?? '');
$salary         = clean($_POST['salary']           ?? '');
$deployDate     = clean($_POST['deployment_date']  ?? '');
$benefits       = clean($_POST['benefits']         ?? '');
$requirements   = clean($_POST['requirements']     ?? '');

if (!$company || !$contactPerson || !$phone || !$country || !$jobTitle || !$workersNeeded) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

$email   = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$replyTo = $email ?: FROM_EMAIL;

// ─── Build email ──────────────────────────────────────────────────────────────
$mailSubject = noNewlines('Employer Requirement: ' . $jobTitle . ' (' . $company . ') — ' . SITE_NAME);

$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="background:#2B3675;padding:28px 36px;">
        <h2 style="margin:0;color:#C8A84B;font-size:1.3rem;">New Employer Requirement</h2>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:0.82rem;">' . SITE_NAME . ' — sunkoshimanpower.com</p>
      </td></tr>
      <tr><td style="padding:28px 36px 8px;">
        <p style="margin:0 0 20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Company Information</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ' . row('Company Name',   $company)
            . row('Contact Person', $contactPerson)
            . row('Email',          $email ?: '—')
            . row('Phone / WhatsApp', $phone)
            . row('Country',        $country)
            . row('Industry / Sector', $sector) . '
        </table>
      </td></tr>
      <tr><td style="padding:8px 36px 8px;">
        <p style="margin:16px 0 20px;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">Manpower Requirements</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ' . row('Job Title / Category', $jobTitle)
            . row('Workers Needed',       $workersNeeded)
            . row('Offered Salary',       $salary)
            . row('Deployment Date',      $deployDate)
            . row('Benefits',             $benefits)
            . row('Requirements / Notes', $requirements) . '
        </table>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:16px 36px;font-size:0.75rem;color:#94a3b8;border-top:1px solid #f1f5f9;margin-top:16px;">
        Submitted from sunkoshimanpower.com employer inquiry form.
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
