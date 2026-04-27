<?php
define('SM_APP', true);
if (session_status() === PHP_SESSION_NONE) session_start();
if (!empty($_SESSION['admin_id'])) { header('Location: dashboard.php'); exit; }

require_once '_db.php';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    if ($username && $password) {
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_user'] = $user['username'];
            $next = $_GET['next'] ?? 'dashboard.php';
            header('Location: ' . $next); exit;
        }
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Admin Login — Sunkoshi Manpower</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body{background:linear-gradient(160deg,#1a2240 0%,#2B3675 50%,#3D5AA9 100%);min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{border-radius:16px;border:none;box-shadow:0 20px 60px rgba(0,0,0,0.3);max-width:420px;width:100%}
.logo{width:64px;height:64px;object-fit:contain;margin-bottom:12px}
.btn-login{background:#2B3675;color:#fff;font-weight:600;padding:12px}
.btn-login:hover{background:#3D5AA9;color:#fff}
</style>
</head><body>
<div class="card p-5">
  <div class="text-center mb-4">
    <img src="/images/logo.png" class="logo" alt="Logo">
    <h4 class="fw-bold text-navy mb-0" style="color:#2B3675">Sunkoshi Manpower</h4>
    <p class="text-muted small">Admin Panel</p>
  </div>
  <?php if ($error): ?>
    <div class="alert alert-danger py-2 small"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>
  <form method="POST">
    <div class="mb-3">
      <label class="form-label small fw-bold">Username</label>
      <input type="text" name="username" class="form-control" required autofocus>
    </div>
    <div class="mb-4">
      <label class="form-label small fw-bold">Password</label>
      <input type="password" name="password" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-login w-100">Login</button>
  </form>
</div>
</body></html>
