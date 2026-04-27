<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Applications';

// Handle status update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    try {
        if ($_POST['action'] === 'update_status') {
            $stmt = $pdo->prepare("UPDATE applications SET status=?, notes=?, updated_at=NOW() WHERE id=?");
            $stmt->execute([$_POST['status'], $_POST['notes'] ?? '', $_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
        if ($_POST['action'] === 'delete') {
            $pdo->prepare("DELETE FROM applications WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
    } catch (Exception $e) {
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
    }
}

// CSV export
if (isset($_GET['export'])) {
    $where = '1=1';
    $params = [];
    if (!empty($_GET['status'])) { $where .= ' AND status=?'; $params[] = $_GET['status']; }
    if (!empty($_GET['country'])) { $where .= ' AND preferred_country=?'; $params[] = $_GET['country']; }
    $rows = $pdo->prepare("SELECT ref_no,full_name,email,phone,dob,district,education,preferred_country,job_category,job_ref,experience,passport_status,experience_details,status,notes,created_at FROM applications WHERE $where ORDER BY created_at DESC");
    $rows->execute($params);
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="applications_' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['Ref No','Full Name','Email','Phone','DOB','District','Education','Country','Job Category','Job Ref','Experience','Passport Status','Details','Status','Notes','Date']);
    foreach ($rows->fetchAll() as $r) fputcsv($out, array_values($r));
    fclose($out); exit;
}

// Fetch with filters
$where = '1=1'; $params = [];
if (!empty($_GET['status'])) { $where .= ' AND status=?'; $params[] = $_GET['status']; }
if (!empty($_GET['country'])) { $where .= ' AND preferred_country=?'; $params[] = $_GET['country']; }
if (!empty($_GET['q'])) { $where .= ' AND (full_name LIKE ? OR ref_no LIKE ? OR email LIKE ?)'; $params[] = "%{$_GET['q']}%"; $params[] = "%{$_GET['q']}%"; $params[] = "%{$_GET['q']}%"; }

$stmt = $pdo->prepare("SELECT id,ref_no,full_name,email,phone,dob,district,education,preferred_country,job_category,job_ref,experience,passport_status,experience_details,status,notes,created_at FROM applications WHERE $where ORDER BY created_at DESC");
$stmt->execute($params);
$apps = $stmt->fetchAll();

$countries = $pdo->query("SELECT DISTINCT preferred_country FROM applications ORDER BY preferred_country")->fetchAll(PDO::FETCH_COLUMN);
$statuses = ['New','Reviewed','Shortlisted','Rejected','Deployed'];
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-file-alt me-2" style="color:#2B3675"></i>Applications</h1>
  <a href="?<?= http_build_query(array_merge($_GET, ['export'=>1])) ?>" class="btn btn-sm btn-success"><i class="fas fa-file-csv me-1"></i>Export CSV</a>
</div>
<div class="content">
  <form method="GET" class="row g-2 mb-3">
    <div class="col-md-4"><input type="text" name="q" class="form-control form-control-sm" placeholder="Search name, ref, email…" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>"></div>
    <div class="col-md-3">
      <select name="status" class="form-select form-select-sm">
        <option value="">All Statuses</option>
        <?php foreach ($statuses as $s): ?>
        <option value="<?= $s ?>" <?= ($_GET['status'] ?? '') === $s ? 'selected' : '' ?>><?= $s ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <div class="col-md-3">
      <select name="country" class="form-select form-select-sm">
        <option value="">All Countries</option>
        <?php foreach ($countries as $c): ?>
        <option value="<?= htmlspecialchars($c) ?>" <?= ($_GET['country'] ?? '') === $c ? 'selected' : '' ?>><?= htmlspecialchars($c) ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <div class="col-md-2 d-flex gap-1">
      <button class="btn btn-sm btn-primary flex-fill">Filter</button>
      <a href="applications.php" class="btn btn-sm btn-outline-secondary">Clear</a>
    </div>
  </form>

  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>Ref</th><th>Name</th><th>Country</th><th>Job Applied</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($apps as $a): ?>
          <tr>
            <td><span class="fw-bold" style="color:#2B3675"><?= htmlspecialchars($a['ref_no']) ?></span></td>
            <td><?= htmlspecialchars($a['full_name']) ?><br><small class="text-muted"><?= htmlspecialchars($a['email']) ?></small></td>
            <td><?= htmlspecialchars($a['preferred_country']) ?></td>
            <td><?= htmlspecialchars($a['job_category']) ?></td>
            <td><span class="status-badge status-<?= $a['status'] ?>"><?= $a['status'] ?></span></td>
            <td class="text-muted small"><?= date('M j, Y', strtotime($a['created_at'])) ?></td>
            <td>
              <button class="btn btn-sm btn-outline-primary btn-view" data-id="<?= $a['id'] ?>" data-bs-toggle="modal" data-bs-target="#appModal" title="View"><i class="fas fa-eye"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-del ms-1" data-id="<?= $a['id'] ?>" data-name="<?= htmlspecialchars($a['full_name']) ?>" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$apps): ?><tr><td colspan="7" class="text-center text-muted py-4">No applications found.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-white text-muted small">Showing <?= count($apps) ?> application(s)</div>
  </div>
</div>

<!-- Application Detail Modal -->
<div class="modal fade" id="appModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title"><i class="fas fa-file-alt me-2"></i>Application Details</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="modalBody"><div class="text-center py-4"><i class="fas fa-spinner fa-spin fa-2x text-muted"></i></div></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="saveStatus"><i class="fas fa-save me-1"></i>Save Changes</button>
      </div>
    </div>
  </div>
</div>

<?php
// Inline JSON of all apps for modal
$appsJson = json_encode(array_column($apps, null, 'id'), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
?>
<script>
const APPS = <?= $appsJson ?>;
const STATUSES = <?= json_encode($statuses) ?>;
let currentId = null;

document.querySelectorAll('.btn-view').forEach(btn => {
  btn.addEventListener('click', () => {
    currentId = btn.dataset.id;
    const a = APPS[currentId];
    document.getElementById('modalBody').innerHTML = `
      <div class="row g-3">
        <div class="col-md-6"><strong>Ref:</strong> ${a.ref_no}</div>
        <div class="col-md-6"><strong>Date:</strong> ${a.created_at}</div>
        <div class="col-md-6"><strong>Full Name:</strong> ${a.full_name}</div>
        <div class="col-md-6"><strong>Email:</strong> <a href="mailto:${a.email}">${a.email||'—'}</a></div>
        <div class="col-md-6"><strong>Phone:</strong> ${a.phone}</div>
        <div class="col-md-6"><strong>DOB:</strong> ${a.dob||'—'}</div>
        <div class="col-md-6"><strong>District:</strong> ${a.district||'—'}</div>
        <div class="col-md-6"><strong>Education:</strong> ${a.education||'—'}</div>
        <div class="col-md-6"><strong>Preferred Country:</strong> ${a.preferred_country}</div>
        <div class="col-md-6"><strong>Job Category:</strong> ${a.job_category||'—'}</div>
        <div class="col-md-6"><strong>Job Ref:</strong> ${a.job_ref||'General'}</div>
        <div class="col-md-6"><strong>Experience:</strong> ${a.experience||'—'}</div>
        <div class="col-md-6"><strong>Passport Status:</strong> ${a.passport_status||'—'}</div>
        <div class="col-12"><strong>Experience Details:</strong><p class="text-muted small mb-0">${(a.experience_details||'—').replace(/\n/g,'<br>')}</p></div>
        <div class="col-md-4">
          <label class="form-label fw-bold small">Status</label>
          <select id="modalStatus" class="form-select form-select-sm">
            ${STATUSES.map(s=>`<option value="${s}" ${a.status===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="col-12">
          <label class="form-label fw-bold small">Admin Notes</label>
          <textarea id="modalNotes" class="form-control form-control-sm" rows="3">${a.notes||''}</textarea>
        </div>
      </div>`;
  });
});

document.getElementById('saveStatus').addEventListener('click', () => {
  if (!currentId) return;
  const fd = new FormData();
  fd.append('action','update_status');
  fd.append('id', currentId);
  fd.append('status', document.getElementById('modalStatus').value);
  fd.append('notes', document.getElementById('modalNotes').value);
  fetch('applications.php', {method:'POST', body:fd})
    .then(r=>r.json())
    .then(d=>{ if(d.ok) location.reload(); else alert('Error: ' + d.error); })
    .catch(()=>alert('Server error — check PHP error logs.'));
});

document.querySelectorAll('.btn-del').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm(`Delete application for "${btn.dataset.name}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append('action','delete');
    fd.append('id', btn.dataset.id);
    fetch('applications.php', {method:'POST', body:fd})
      .then(r=>r.json())
      .then(d=>{ if(d.ok) location.reload(); else alert('Error: ' + d.error); })
      .catch(()=>alert('Server error.'));
  });
});
</script>
<?php require '_foot.php'; ?>
