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

// ─── Collect & validate ───────────────────────────────────────────────────────
$name    = clean($_POST['name']    ?? '');
$phone   = clean($_POST['phone']   ?? '');
$email   = trim($_POST['email']    ?? '');
$subject = clean($_POST['subject'] ?? '');
$message = clean($_POST['message'] ?? '');

if (!$name || !$phone || !$subject || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Required fields missing']);
    exit;
}

$email   = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';
$replyTo = $email ?: FROM_EMAIL;

// ─── Build email ──────────────────────────────────────────────────────────────
$mailSubject = noNewlines('Contact: ' . $subject . ' — ' . SITE_NAME);

$body = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr><td style="background:#2B3675;padding:28px 36px;">
        <h2 style="margin:0;color:#C8A84B;font-size:1.3rem;">New Contact Form Message</h2>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:0.82rem;">' . SITE_NAME . ' — sunkoshimanpower.com</p>
      </td></tr>
      <tr><td style="padding:36px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;width:130px;vertical-align:top;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#374151;">' . $name . '</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;vertical-align:top;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#374151;">' . $phone . '</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;vertical-align:top;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#374151;">' . ($email ?: '—') . '</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#2B3675;vertical-align:top;">Subject</td>
              <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#374151;">' . $subject . '</td></tr>
          <tr><td style="padding:12px 0;font-weight:700;color:#2B3675;vertical-align:top;">Message</td>
              <td style="padding:12px 0;color:#374151;line-height:1.7;white-space:pre-wrap;">' . $message . '</td></tr>
        </table>
      </td></tr>
      <tr><td style="background:#f8fafc;padding:16px 36px;font-size:0.75rem;color:#94a3b8;border-top:1px solid #f1f5f9;">
        Reply to this email to respond directly to the sender.
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
