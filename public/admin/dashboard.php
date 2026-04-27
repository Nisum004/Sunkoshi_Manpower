<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Dashboard';

$stats = [
  'total_apps'    => $pdo->query("SELECT COUNT(*) FROM applications")->fetchColumn(),
  'new_apps'      => $pdo->query("SELECT COUNT(*) FROM applications WHERE status='New'")->fetchColumn(),
  'deployed'      => $pdo->query("SELECT COUNT(*) FROM applications WHERE status='Deployed'")->fetchColumn(),
  'open_jobs'     => $pdo->query("SELECT COUNT(*) FROM jobs WHERE open=1")->fetchColumn(),
  'total_jobs'    => $pdo->query("SELECT COUNT(*) FROM jobs")->fetchColumn(),
  'news_count'    => $pdo->query("SELECT COUNT(*) FROM news")->fetchColumn(),
  'new_contacts'  => $pdo->query("SELECT COUNT(*) FROM contacts WHERE read_status=0")->fetchColumn(),
  'new_employers' => $pdo->query("SELECT COUNT(*) FROM employer_inquiries WHERE read_status=0")->fetchColumn(),
];

$recentApps = $pdo->query("SELECT ref_no,full_name,preferred_country,status,created_at FROM applications ORDER BY created_at DESC LIMIT 5")->fetchAll();
$recentCon  = $pdo->query("SELECT name,subject,created_at FROM contacts ORDER BY created_at DESC LIMIT 5")->fetchAll();
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-chart-line me-2" style="color:#2B3675"></i>Dashboard</h1>
  <span class="text-muted small">Welcome, <?= htmlspecialchars($_SESSION['admin_user']) ?></span>
</div>
<div class="content">
  <div class="row g-3 mb-4">
    <div class="col-md-3"><div class="stat-card" style="background:#2B3675"><div class="stat-icon"><i class="fas fa-file-alt"></i></div><div><div style="font-size:2rem;font-weight:700"><?= $stats['total_apps'] ?></div><div style="font-size:0.78rem;opacity:0.7">Total Applications</div><div style="font-size:0.72rem;color:#C8A84B"><?= $stats['new_apps'] ?> new</div></div></div></div>
    <div class="col-md-3"><div class="stat-card" style="background:#065F46"><div class="stat-icon"><i class="fas fa-plane"></i></div><div><div style="font-size:2rem;font-weight:700"><?= $stats['deployed'] ?></div><div style="font-size:0.78rem;opacity:0.7">Deployed</div></div></div></div>
    <div class="col-md-3"><div class="stat-card" style="background:#1E40AF"><div class="stat-icon"><i class="fas fa-briefcase"></i></div><div><div style="font-size:2rem;font-weight:700"><?= $stats['open_jobs'] ?></div><div style="font-size:0.78rem;opacity:0.7">Open Jobs</div><div style="font-size:0.72rem;opacity:0.6"><?= $stats['total_jobs'] ?> total</div></div></div></div>
    <div class="col-md-3"><div class="stat-card" style="background:#7C3AED"><div class="stat-icon"><i class="fas fa-envelope"></i></div><div><div style="font-size:2rem;font-weight:700"><?= $stats['new_contacts'] + $stats['new_employers'] ?></div><div style="font-size:0.78rem;opacity:0.7">Unread Messages</div><div style="font-size:0.72rem;opacity:0.6"><?= $stats['new_employers'] ?> employer, <?= $stats['new_contacts'] ?> contact</div></div></div></div>
  </div>
  <div class="row g-3">
    <div class="col-md-7">
      <div class="card">
        <div class="card-header bg-white fw-bold" style="color:#2B3675">Recent Applications</div>
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead><tr><th>Ref</th><th>Name</th><th>Country</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              <?php foreach ($recentApps as $a): ?>
              <tr>
                <td><a href="applications.php" class="text-decoration-none fw-bold" style="color:#2B3675"><?= htmlspecialchars($a['ref_no']) ?></a></td>
                <td><?= htmlspecialchars($a['full_name']) ?></td>
                <td><?= htmlspecialchars($a['preferred_country']) ?></td>
                <td><span class="status-badge status-<?= $a['status'] ?>"><?= $a['status'] ?></span></td>
                <td class="text-muted"><?= date('M j', strtotime($a['created_at'])) ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
        <div class="card-footer bg-white text-end"><a href="applications.php" class="small text-decoration-none" style="color:#2B3675">View all →</a></div>
      </div>
    </div>
    <div class="col-md-5">
      <div class="card">
        <div class="card-header bg-white fw-bold" style="color:#2B3675">Recent Contact Messages</div>
        <ul class="list-group list-group-flush">
          <?php foreach ($recentCon as $c): ?>
          <li class="list-group-item py-2">
            <div class="fw-bold small"><?= htmlspecialchars($c['name']) ?></div>
            <div class="text-muted" style="font-size:0.78rem"><?= htmlspecialchars($c['subject']) ?></div>
            <div class="text-muted" style="font-size:0.72rem"><?= date('M j, Y', strtotime($c['created_at'])) ?></div>
          </li>
          <?php endforeach; ?>
        </ul>
        <div class="card-footer bg-white text-end"><a href="contacts.php" class="small text-decoration-none" style="color:#2B3675">View all →</a></div>
      </div>
    </div>
  </div>
</div>
<?php require '_foot.php'; ?>
