<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Jobs';

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $a = $_POST['action'];

    if ($a === 'save') {
        try {
            $deadline = !empty($_POST['deadline']) ? $_POST['deadline'] : null;
            $data = [
                $_POST['title'], $_POST['country'], $_POST['flag'] ?? '',
                $_POST['category'] ?? 'Skilled', (int)($_POST['vacancies'] ?? 1),
                $_POST['salary'] ?? '', $_POST['benefits'] ?? '',
                $_POST['description'] ?? '', $_POST['requirements'] ?? '',
                $deadline, (int)($_POST['open'] ?? 1)
            ];
            if (empty($_POST['id'])) {
                $maxNum = (int)$pdo->query("SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) FROM jobs")->fetchColumn();
                $newJobId = 'J' . str_pad($maxNum + 1, 3, '0', STR_PAD_LEFT);
                $stmt = $pdo->prepare("INSERT INTO jobs (id,title,country,flag,category,vacancies,salary,benefits,description,requirements,deadline,open) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
                $stmt->execute(array_merge([$newJobId], $data));
            } else {
                $stmt = $pdo->prepare("UPDATE jobs SET title=?,country=?,flag=?,category=?,vacancies=?,salary=?,benefits=?,description=?,requirements=?,deadline=?,open=?,updated_at=NOW() WHERE id=?");
                $stmt->execute(array_merge($data, [$_POST['id']]));
            }
            echo json_encode(['ok' => true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
        }
    }

    if ($a === 'toggle') {
        try {
            $pdo->prepare("UPDATE jobs SET open = 1-open, updated_at=NOW() WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
        }
    }

    if ($a === 'delete') {
        try {
            $pdo->prepare("DELETE FROM jobs WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
        }
    }
}

$jobs = $pdo->query("SELECT * FROM jobs ORDER BY open DESC, created_at DESC")->fetchAll();
$categories = ['Skilled','Semi-Skilled','Unskilled','Trainee'];
$flagCodes = ['ae'=>'UAE','bh'=>'Bahrain','jp'=>'Japan','kw'=>'Kuwait','my'=>'Malaysia','om'=>'Oman','qa'=>'Qatar','sa'=>'Saudi Arabia','sg'=>'Singapore','kr'=>'South Korea'];
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-briefcase me-2" style="color:#2B3675"></i>Jobs</h1>
  <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#jobModal" id="btnAdd"><i class="fas fa-plus me-1"></i>Add Job</button>
</div>
<div class="content">
  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>ID</th><th>Title</th><th>Country</th><th>Category</th><th>Vacancies</th><th>Salary</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($jobs as $j): ?>
          <tr>
            <td><code><?= htmlspecialchars($j['id']) ?></code></td>
            <td class="fw-bold"><?= htmlspecialchars($j['title']) ?></td>
            <td><?= htmlspecialchars($j['country']) ?></td>
            <td><span class="badge bg-secondary"><?= htmlspecialchars($j['category']) ?></span></td>
            <td><?= (int)$j['vacancies'] ?></td>
            <td><?= htmlspecialchars($j['salary']) ?></td>
            <td><span class="status-badge <?= $j['open'] ? 'status-New' : 'status-Rejected' ?>"><?= $j['open'] ? 'Open' : 'Closed' ?></span></td>
            <td>
              <button class="btn btn-sm btn-outline-primary btn-edit"
                data-id="<?= htmlspecialchars($j['id'], ENT_QUOTES) ?>"
                data-title="<?= htmlspecialchars($j['title'], ENT_QUOTES) ?>"
                data-country="<?= htmlspecialchars($j['country'], ENT_QUOTES) ?>"
                data-flag="<?= htmlspecialchars($j['flag'] ?? '', ENT_QUOTES) ?>"
                data-category="<?= htmlspecialchars($j['category'], ENT_QUOTES) ?>"
                data-vacancies="<?= (int)$j['vacancies'] ?>"
                data-salary="<?= htmlspecialchars($j['salary'], ENT_QUOTES) ?>"
                data-benefits="<?= htmlspecialchars($j['benefits'] ?? '', ENT_QUOTES) ?>"
                data-description="<?= htmlspecialchars($j['description'] ?? '', ENT_QUOTES) ?>"
                data-requirements="<?= htmlspecialchars($j['requirements'] ?? '', ENT_QUOTES) ?>"
                data-deadline="<?= htmlspecialchars($j['deadline'] ?? '', ENT_QUOTES) ?>"
                data-open="<?= $j['open'] ?>"
                data-bs-toggle="modal" data-bs-target="#jobModal"
                title="Edit"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm <?= $j['open'] ? 'btn-outline-warning' : 'btn-outline-success' ?> btn-toggle ms-1"
                data-id="<?= htmlspecialchars($j['id'], ENT_QUOTES) ?>"
                title="<?= $j['open'] ? 'Close' : 'Open' ?>">
                <i class="fas fa-<?= $j['open'] ? 'eye-slash' : 'eye' ?>"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger btn-del ms-1"
                data-id="<?= htmlspecialchars($j['id'], ENT_QUOTES) ?>"
                data-title="<?= htmlspecialchars($j['title'], ENT_QUOTES) ?>"
                title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$jobs): ?><tr><td colspan="8" class="text-center text-muted py-4">No jobs found.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-white text-muted small"><?= count($jobs) ?> job(s) total</div>
  </div>
</div>

<!-- Job Modal -->
<div class="modal fade" id="jobModal" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title" id="jobModalTitle">Add Job</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="jobId">
        <div class="row g-3">
          <div class="col-md-8">
            <label class="form-label small fw-bold">Job Title *</label>
            <input type="text" id="jobTitle" class="form-control" required>
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">Category *</label>
            <select id="jobCat" class="form-select">
              <?php foreach ($categories as $c): ?><option><?= $c ?></option><?php endforeach; ?>
            </select>
          </div>
          <div class="col-md-5">
            <label class="form-label small fw-bold">Country *</label>
            <input type="text" id="jobCountry" class="form-control" placeholder="e.g. Qatar, Saudi Arabia">
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">Country Flag Code</label>
            <select id="jobFlag" class="form-select">
              <option value="">— select —</option>
              <?php foreach ($flagCodes as $code => $name): ?>
              <option value="<?= $code ?>"><?= $name ?> (<?= $code ?>)</option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small fw-bold">Vacancies</label>
            <input type="number" id="jobVacancies" class="form-control" value="1" min="0">
          </div>
          <div class="col-md-2 d-flex align-items-center">
            <div class="form-check form-switch mt-3">
              <input class="form-check-input" type="checkbox" id="jobOpen" checked>
              <label class="form-check-label fw-bold small" for="jobOpen">Open</label>
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">Salary</label>
            <input type="text" id="jobSalary" class="form-control" placeholder="e.g. QAR 1,200/month">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">Benefits</label>
            <input type="text" id="jobBenefits" class="form-control" placeholder="e.g. Free accommodation & transport">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">Apply Deadline</label>
            <input type="text" id="jobDeadline" class="form-control" placeholder="DD/MM/YYYY" maxlength="10" oninput="autoDate(event)">
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Job Description</label>
            <textarea id="jobDesc" class="form-control" rows="3"></textarea>
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Requirements <span class="text-muted fw-normal">(one per line)</span></label>
            <textarea id="jobReq" class="form-control" rows="5" placeholder="Minimum 2 years experience&#10;Valid passport&#10;Medical fitness certificate"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="saveJob"><i class="fas fa-save me-1"></i>Save Job</button>
      </div>
    </div>
  </div>
</div>

<script>
function fmtDMY(ymd) { if (!ymd) return ''; const [y,m,d] = ymd.split('-'); return `${d}/${m}/${y}`; }
function parseDMY(dmy) { if (!dmy || dmy.length < 10) return dmy; const [d,m,y] = dmy.split('/'); return `${y}-${m}-${d}`; }
function autoDate(e) { let v = e.target.value.replace(/\D/g,''); if (v.length>2) v=v.slice(0,2)+'/'+v.slice(2); if (v.length>5) v=v.slice(0,5)+'/'+v.slice(5); e.target.value=v.slice(0,10); }

document.getElementById('btnAdd').addEventListener('click', () => {
  document.getElementById('jobModalTitle').textContent = 'Add Job';
  document.getElementById('jobId').value = '';
  document.getElementById('jobTitle').value = '';
  document.getElementById('jobCountry').value = '';
  document.getElementById('jobFlag').value = '';
  document.getElementById('jobCat').value = 'Skilled';
  document.getElementById('jobVacancies').value = '1';
  document.getElementById('jobSalary').value = '';
  document.getElementById('jobBenefits').value = '';
  document.getElementById('jobDesc').value = '';
  document.getElementById('jobReq').value = '';
  document.getElementById('jobDeadline').value = '';
  document.getElementById('jobOpen').checked = true;
});

document.querySelectorAll('.btn-edit').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('jobModalTitle').textContent = 'Edit Job';
    document.getElementById('jobId').value = btn.dataset.id;
    document.getElementById('jobTitle').value = btn.dataset.title;
    document.getElementById('jobCountry').value = btn.dataset.country;
    document.getElementById('jobFlag').value = btn.dataset.flag;
    document.getElementById('jobCat').value = btn.dataset.category;
    document.getElementById('jobVacancies').value = btn.dataset.vacancies;
    document.getElementById('jobSalary').value = btn.dataset.salary;
    document.getElementById('jobBenefits').value = btn.dataset.benefits;
    document.getElementById('jobDesc').value = btn.dataset.description;
    document.getElementById('jobReq').value = btn.dataset.requirements;
    document.getElementById('jobDeadline').value = fmtDMY(btn.dataset.deadline);
    document.getElementById('jobOpen').checked = btn.dataset.open === '1';
  });
});

document.getElementById('saveJob').addEventListener('click', () => {
  const title = document.getElementById('jobTitle').value.trim();
  const country = document.getElementById('jobCountry').value.trim();
  if (!title || !country) { alert('Title and country are required.'); return; }
  const fd = new FormData();
  fd.append('action', 'save');
  fd.append('id', document.getElementById('jobId').value);
  fd.append('title', title);
  fd.append('country', country);
  fd.append('flag', document.getElementById('jobFlag').value);
  fd.append('category', document.getElementById('jobCat').value);
  fd.append('vacancies', document.getElementById('jobVacancies').value);
  fd.append('salary', document.getElementById('jobSalary').value);
  fd.append('benefits', document.getElementById('jobBenefits').value);
  fd.append('description', document.getElementById('jobDesc').value);
  fd.append('requirements', document.getElementById('jobReq').value);
  fd.append('deadline', parseDMY(document.getElementById('jobDeadline').value));
  fd.append('open', document.getElementById('jobOpen').checked ? 1 : 0);
  fetch('jobs.php', {method:'POST', body:fd})
    .then(r=>r.json())
    .then(d=>{ if(d.ok) location.reload(); else alert('Error: ' + d.error); })
    .catch(()=>alert('Server error — check PHP error logs.'));
});

document.querySelectorAll('.btn-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const fd = new FormData(); fd.append('action','toggle'); fd.append('id', btn.dataset.id);
    fetch('jobs.php', {method:'POST', body:fd})
      .then(r=>r.json())
      .then(d=>{ if(d.ok) location.reload(); else alert('Error: ' + d.error); })
      .catch(()=>alert('Server error.'));
  });
});

document.querySelectorAll('.btn-del').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm(`Delete job "${btn.dataset.title}"? This cannot be undone.`)) return;
    const fd = new FormData(); fd.append('action','delete'); fd.append('id', btn.dataset.id);
    fetch('jobs.php', {method:'POST', body:fd})
      .then(r=>r.json())
      .then(d=>{ if(d.ok) location.reload(); else alert('Error: ' + d.error); })
      .catch(()=>alert('Server error.'));
  });
});
</script>
<?php require '_foot.php'; ?>
