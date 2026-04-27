<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Employer Inquiries';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    try {
        if ($_POST['action'] === 'mark_read') {
            $pdo->prepare("UPDATE employer_inquiries SET read_status=1 WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
        if ($_POST['action'] === 'delete') {
            $pdo->prepare("DELETE FROM employer_inquiries WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
        if ($_POST['action'] === 'mark_all_read') {
            $pdo->query("UPDATE employer_inquiries SET read_status=1 WHERE read_status=0");
            echo json_encode(['ok' => true]); exit;
        }
    } catch (Exception $e) {
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
    }
}

// CSV export
if (isset($_GET['export'])) {
    $rows = $pdo->query("SELECT company_name,contact_person,email,phone,country,sector,job_title,workers_needed,salary,deployment_date,benefits,requirements,read_status,created_at FROM employer_inquiries ORDER BY created_at DESC")->fetchAll();
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="employers_' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['Company','Contact Person','Email','Phone','Country','Sector','Job Title','Workers Needed','Salary','Deploy Date','Benefits','Requirements','Read','Date']);
    foreach ($rows as $r) fputcsv($out, array_values($r));
    fclose($out); exit;
}

$filter = $_GET['filter'] ?? 'all';
$where = $filter === 'unread' ? 'WHERE read_status=0' : '';
$employers = $pdo->query("SELECT * FROM employer_inquiries $where ORDER BY created_at DESC")->fetchAll();
$unreadCount = $pdo->query("SELECT COUNT(*) FROM employer_inquiries WHERE read_status=0")->fetchColumn();
$totalCount = $pdo->query("SELECT COUNT(*) FROM employer_inquiries")->fetchColumn();
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-building me-2" style="color:#2B3675"></i>Employer Inquiries</h1>
  <div class="d-flex gap-2">
    <?php if ($unreadCount > 0): ?>
    <button class="btn btn-sm btn-outline-secondary" id="btnMarkAll"><i class="fas fa-check-double me-1"></i>Mark All Read</button>
    <?php endif; ?>
    <a href="?export=1" class="btn btn-sm btn-success"><i class="fas fa-file-csv me-1"></i>Export CSV</a>
  </div>
</div>
<div class="content">
  <div class="mb-3">
    <a href="?filter=all" class="btn btn-sm <?= $filter==='all' ? 'btn-primary' : 'btn-outline-secondary' ?>">All (<?= $totalCount ?>)</a>
    <a href="?filter=unread" class="btn btn-sm <?= $filter==='unread' ? 'btn-primary' : 'btn-outline-secondary' ?> ms-1">Unread (<?= $unreadCount ?>)</a>
  </div>

  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th></th><th>Company</th><th>Contact</th><th>Country</th><th>Sector</th><th>Job Title</th><th>Workers</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($employers as $e): ?>
          <tr class="<?= !$e['read_status'] ? 'fw-semibold' : '' ?>" id="row-<?= $e['id'] ?>">
            <td><i class="fas fa-<?= $e['read_status'] ? 'envelope-open text-muted' : 'envelope text-primary' ?>" style="font-size:1rem"></i></td>
            <td><?= htmlspecialchars($e['company_name']) ?></td>
            <td>
              <?= htmlspecialchars($e['contact_person']) ?><br>
              <small><a href="mailto:<?= htmlspecialchars($e['email']) ?>"><?= htmlspecialchars($e['email']) ?></a></small>
            </td>
            <td><?= htmlspecialchars($e['country']) ?></td>
            <td><?= htmlspecialchars($e['sector'] ?? '—') ?></td>
            <td><?= htmlspecialchars($e['job_title'] ?? '—') ?></td>
            <td><?= htmlspecialchars($e['workers_needed'] ?? '—') ?></td>
            <td class="text-muted small"><?= date('M j, Y', strtotime($e['created_at'])) ?></td>
            <td>
              <button class="btn btn-sm btn-outline-info btn-view-emp"
                data-id="<?= $e['id'] ?>"
                data-company="<?= htmlspecialchars($e['company_name'], ENT_QUOTES) ?>"
                data-contact="<?= htmlspecialchars($e['contact_person'], ENT_QUOTES) ?>"
                data-email="<?= htmlspecialchars($e['email'], ENT_QUOTES) ?>"
                data-phone="<?= htmlspecialchars($e['phone'] ?? '', ENT_QUOTES) ?>"
                data-country="<?= htmlspecialchars($e['country'], ENT_QUOTES) ?>"
                data-sector="<?= htmlspecialchars($e['sector'] ?? '', ENT_QUOTES) ?>"
                data-jobtitle="<?= htmlspecialchars($e['job_title'] ?? '', ENT_QUOTES) ?>"
                data-workers="<?= htmlspecialchars($e['workers_needed'] ?? '', ENT_QUOTES) ?>"
                data-salary="<?= htmlspecialchars($e['salary'] ?? '', ENT_QUOTES) ?>"
                data-deploydate="<?= htmlspecialchars($e['deployment_date'] ?? '', ENT_QUOTES) ?>"
                data-benefits="<?= htmlspecialchars($e['benefits'] ?? '', ENT_QUOTES) ?>"
                data-requirements="<?= htmlspecialchars($e['requirements'] ?? '', ENT_QUOTES) ?>"
                data-date="<?= date('M j, Y g:i A', strtotime($e['created_at'])) ?>"
                data-bs-toggle="modal" data-bs-target="#empModal"
                title="View"><i class="fas fa-eye"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-del-emp ms-1" data-id="<?= $e['id'] ?>" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$employers): ?><tr><td colspan="8" class="text-center text-muted py-4">No employer inquiries.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Employer Detail Modal -->
<div class="modal fade" id="empModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title">Employer Inquiry Details</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="empBody"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <a id="empReply" href="#" class="btn btn-primary"><i class="fas fa-reply me-1"></i>Reply via Email</a>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.btn-view-emp').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    document.getElementById('empBody').innerHTML = `
      <dl class="row mb-0">
        <dt class="col-sm-4">Company Name</dt><dd class="col-sm-8">${btn.dataset.company}</dd>
        <dt class="col-sm-4">Contact Person</dt><dd class="col-sm-8">${btn.dataset.contact}</dd>
        <dt class="col-sm-4">Email</dt><dd class="col-sm-8"><a href="mailto:${btn.dataset.email}">${btn.dataset.email||'—'}</a></dd>
        <dt class="col-sm-4">Phone</dt><dd class="col-sm-8">${btn.dataset.phone || '—'}</dd>
        <dt class="col-sm-4">Country</dt><dd class="col-sm-8">${btn.dataset.country}</dd>
        <dt class="col-sm-4">Sector</dt><dd class="col-sm-8">${btn.dataset.sector || '—'}</dd>
        <dt class="col-sm-4">Job Title</dt><dd class="col-sm-8">${btn.dataset.jobtitle || '—'}</dd>
        <dt class="col-sm-4">Workers Needed</dt><dd class="col-sm-8">${btn.dataset.workers || '—'}</dd>
        <dt class="col-sm-4">Salary</dt><dd class="col-sm-8">${btn.dataset.salary || '—'}</dd>
        <dt class="col-sm-4">Deploy Date</dt><dd class="col-sm-8">${btn.dataset.deploydate || '—'}</dd>
        <dt class="col-sm-4">Benefits</dt><dd class="col-sm-8">${(btn.dataset.benefits||'—').replace(/\n/g,'<br>')}</dd>
        <dt class="col-sm-4">Requirements</dt><dd class="col-sm-8">${(btn.dataset.requirements||'—').replace(/\n/g,'<br>')}</dd>
        <dt class="col-sm-4">Date</dt><dd class="col-sm-8 text-muted">${btn.dataset.date}</dd>
      </dl>`;
    document.getElementById('empReply').href = `mailto:${btn.dataset.email}?subject=Re: Employer Inquiry from ${encodeURIComponent(btn.dataset.company)}`;
    const fd = new FormData(); fd.append('action','mark_read'); fd.append('id', id);
    fetch('employers.php', {method:'POST', body:fd}).then(() => {
      const row = document.getElementById('row-'+id);
      if (row) { row.classList.remove('fw-semibold'); row.querySelector('.fa-envelope')?.classList.replace('fa-envelope','fa-envelope-open'); }
    });
  });
});

document.querySelectorAll('.btn-del-emp').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm('Delete this employer inquiry? This cannot be undone.')) return;
    const fd = new FormData(); fd.append('action','delete'); fd.append('id', btn.dataset.id);
    fetch('employers.php', {method:'POST', body:fd})
      .then(r=>r.json())
      .then(d=>{ if(d.ok) location.reload(); else alert('Error: '+d.error); })
      .catch(()=>alert('Server error.'));
  });
});

document.getElementById('btnMarkAll')?.addEventListener('click', () => {
  const fd = new FormData(); fd.append('action','mark_all_read');
  fetch('employers.php', {method:'POST', body:fd})
    .then(r=>r.json())
    .then(d=>{ if(d.ok) location.reload(); else alert('Error: '+d.error); })
    .catch(()=>alert('Server error.'));
});
</script>
<?php require '_foot.php'; ?>
