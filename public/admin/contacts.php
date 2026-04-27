<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Contacts';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    try {
        if ($_POST['action'] === 'mark_read') {
            $pdo->prepare("UPDATE contacts SET read_status=1 WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
        if ($_POST['action'] === 'delete') {
            $pdo->prepare("DELETE FROM contacts WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        }
        if ($_POST['action'] === 'mark_all_read') {
            $pdo->query("UPDATE contacts SET read_status=1 WHERE read_status=0");
            echo json_encode(['ok' => true]); exit;
        }
    } catch (Exception $e) {
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
    }
}

// CSV export
if (isset($_GET['export'])) {
    $rows = $pdo->query("SELECT name,email,phone,subject,message,read_status,created_at FROM contacts ORDER BY created_at DESC")->fetchAll();
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="contacts_' . date('Y-m-d') . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['Name','Email','Phone','Subject','Message','Read','Date']);
    foreach ($rows as $r) fputcsv($out, array_values($r));
    fclose($out); exit;
}

$filter = $_GET['filter'] ?? 'all';
$where = $filter === 'unread' ? 'WHERE read_status=0' : '';
$contacts = $pdo->query("SELECT * FROM contacts $where ORDER BY created_at DESC")->fetchAll();
$unreadCount = $pdo->query("SELECT COUNT(*) FROM contacts WHERE read_status=0")->fetchColumn();
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-envelope me-2" style="color:#2B3675"></i>Contact Messages</h1>
  <div class="d-flex gap-2">
    <?php if ($unreadCount > 0): ?>
    <button class="btn btn-sm btn-outline-secondary" id="btnMarkAll"><i class="fas fa-check-double me-1"></i>Mark All Read</button>
    <?php endif; ?>
    <a href="?export=1" class="btn btn-sm btn-success"><i class="fas fa-file-csv me-1"></i>Export CSV</a>
  </div>
</div>
<div class="content">
  <div class="mb-3">
    <a href="?filter=all" class="btn btn-sm <?= $filter==='all' ? 'btn-primary' : 'btn-outline-secondary' ?>">All (<?= count($pdo->query("SELECT id FROM contacts")->fetchAll()) ?>)</a>
    <a href="?filter=unread" class="btn btn-sm <?= $filter==='unread' ? 'btn-primary' : 'btn-outline-secondary' ?> ms-1">Unread (<?= $unreadCount ?>)</a>
  </div>

  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th></th><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($contacts as $c): ?>
          <tr class="<?= !$c['read_status'] ? 'fw-semibold' : '' ?>" id="row-<?= $c['id'] ?>">
            <td><i class="fas fa-<?= $c['read_status'] ? 'envelope-open text-muted' : 'envelope text-primary' ?>" style="font-size:1rem"></i></td>
            <td><?= htmlspecialchars($c['name']) ?></td>
            <td><a href="mailto:<?= htmlspecialchars($c['email']) ?>"><?= htmlspecialchars($c['email']) ?></a></td>
            <td><?= htmlspecialchars($c['subject']) ?></td>
            <td class="text-muted small"><?= date('M j, Y', strtotime($c['created_at'])) ?></td>
            <td>
              <button class="btn btn-sm btn-outline-info btn-view-con"
                data-id="<?= $c['id'] ?>"
                data-name="<?= htmlspecialchars($c['name'], ENT_QUOTES) ?>"
                data-email="<?= htmlspecialchars($c['email'], ENT_QUOTES) ?>"
                data-phone="<?= htmlspecialchars($c['phone'] ?? '', ENT_QUOTES) ?>"
                data-subject="<?= htmlspecialchars($c['subject'], ENT_QUOTES) ?>"
                data-message="<?= htmlspecialchars($c['message'], ENT_QUOTES) ?>"
                data-date="<?= date('M j, Y g:i A', strtotime($c['created_at'])) ?>"
                data-bs-toggle="modal" data-bs-target="#conModal"
                title="View"><i class="fas fa-eye"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-del-con ms-1" data-id="<?= $c['id'] ?>" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$contacts): ?><tr><td colspan="6" class="text-center text-muted py-4">No messages.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Message Modal -->
<div class="modal fade" id="conModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title">Contact Message</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="conBody"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <a id="conReply" href="#" class="btn btn-primary"><i class="fas fa-reply me-1"></i>Reply via Email</a>
      </div>
    </div>
  </div>
</div>

<script>
let currentConId = null;

document.querySelectorAll('.btn-view-con').forEach(btn => {
  btn.addEventListener('click', () => {
    currentConId = btn.dataset.id;
    document.getElementById('conBody').innerHTML = `
      <dl class="row mb-0">
        <dt class="col-sm-3">Name</dt><dd class="col-sm-9">${btn.dataset.name}</dd>
        <dt class="col-sm-3">Email</dt><dd class="col-sm-9"><a href="mailto:${btn.dataset.email}">${btn.dataset.email}</a></dd>
        <dt class="col-sm-3">Phone</dt><dd class="col-sm-9">${btn.dataset.phone || '—'}</dd>
        <dt class="col-sm-3">Subject</dt><dd class="col-sm-9">${btn.dataset.subject}</dd>
        <dt class="col-sm-3">Date</dt><dd class="col-sm-9 text-muted">${btn.dataset.date}</dd>
        <dt class="col-sm-3">Message</dt><dd class="col-sm-9">${btn.dataset.message.replace(/\n/g,'<br>')}</dd>
      </dl>`;
    document.getElementById('conReply').href = `mailto:${btn.dataset.email}?subject=Re: ${encodeURIComponent(btn.dataset.subject)}`;
    // Mark as read
    const fd = new FormData(); fd.append('action','mark_read'); fd.append('id', currentConId);
    fetch('contacts.php', {method:'POST', body:fd}).then(() => {
      const row = document.getElementById('row-'+currentConId);
      if (row) { row.classList.remove('fw-semibold'); row.querySelector('.fa-envelope')?.classList.replace('fa-envelope','fa-envelope-open'); }
    });
  });
});

document.querySelectorAll('.btn-del-con').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm('Delete this message? This cannot be undone.')) return;
    const fd = new FormData(); fd.append('action','delete'); fd.append('id', btn.dataset.id);
    fetch('contacts.php', {method:'POST', body:fd})
      .then(r=>r.json())
      .then(d=>{ if(d.ok) location.reload(); else alert('Error: '+d.error); })
      .catch(()=>alert('Server error.'));
  });
});

document.getElementById('btnMarkAll')?.addEventListener('click', () => {
  const fd = new FormData(); fd.append('action','mark_all_read');
  fetch('contacts.php', {method:'POST', body:fd})
    .then(r=>r.json())
    .then(d=>{ if(d.ok) location.reload(); else alert('Error: '+d.error); })
    .catch(()=>alert('Server error.'));
});
</script>
<?php require '_foot.php'; ?>
