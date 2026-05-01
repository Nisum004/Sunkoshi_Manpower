<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'Ads';

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $a = $_POST['action'];

    if ($a === 'save') {
        try {
            // Handle image upload
            $imagePath = $_POST['existing_image'] ?? '';
            if (!empty($_FILES['ad_image']['tmp_name'])) {
                $allowed = ['jpg','jpeg','png','gif','webp'];
                $ext = strtolower(pathinfo($_FILES['ad_image']['name'], PATHINFO_EXTENSION));
                if (!in_array($ext, $allowed)) {
                    echo json_encode(['ok'=>false,'error'=>'Only JPG, PNG, GIF, WEBP allowed']); exit;
                }
                if ($_FILES['ad_image']['size'] > 5 * 1024 * 1024) {
                    echo json_encode(['ok'=>false,'error'=>'Image must be under 5 MB']); exit;
                }
                $uploadDir = dirname(__DIR__) . '/uploads/ads/';
                if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);
                $filename = uniqid('ad_') . '.' . $ext;
                if (!move_uploaded_file($_FILES['ad_image']['tmp_name'], $uploadDir . $filename)) {
                    echo json_encode(['ok'=>false,'error'=>'Upload failed — check folder permissions']); exit;
                }
                $imagePath = '/uploads/ads/' . $filename;
            }

            $title    = trim($_POST['title']    ?? '');
            $linkUrl  = trim($_POST['link_url'] ?? '');
            $date     = !empty($_POST['date']) ? $_POST['date'] : date('Y-m-d');
            $id       = $_POST['id'] ?? null;
            // slug = unique token for ads (not used in URL but required by DB)
            $slug = !empty($id) ? ($_POST['slug'] ?? '') : ('ad-' . uniqid());

            if (empty($id)) {
                $stmt = $pdo->prepare(
                    "INSERT INTO news (slug,title,excerpt,content,category,image,tags,date) VALUES (?,?,?,?,?,?,?,?)"
                );
                $stmt->execute([$slug, $title, '', $linkUrl, 'Ads', $imagePath, '', $date]);
            } else {
                $stmt = $pdo->prepare(
                    "UPDATE news SET title=?,content=?,image=?,date=?,updated_at=NOW() WHERE id=?"
                );
                $stmt->execute([$title, $linkUrl, $imagePath, $date, $id]);
            }
            echo json_encode(['ok'=>true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok'=>false,'error'=>$e->getMessage()]); exit;
        }
    }

    if ($a === 'delete') {
        try {
            // Optionally delete the uploaded file
            $row = $pdo->prepare("SELECT image FROM news WHERE id=?");
            $row->execute([$_POST['id']]);
            $r = $row->fetch();
            if ($r && strpos($r['image'], '/uploads/ads/') === 0) {
                $path = dirname(__DIR__) . $r['image'];
                if (file_exists($path)) unlink($path);
            }
            $pdo->prepare("DELETE FROM news WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok'=>true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok'=>false,'error'=>$e->getMessage()]); exit;
        }
    }
}

// GET single for edit
if (isset($_GET['get']) && is_numeric($_GET['get'])) {
    $row = $pdo->prepare("SELECT * FROM news WHERE id=? AND category='Ads'");
    $row->execute([$_GET['get']]);
    echo json_encode($row->fetch()); exit;
}

$ads = $pdo->query("SELECT id,slug,title,image,content,date FROM news WHERE category='Ads' ORDER BY date DESC")->fetchAll();
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-bullhorn me-2" style="color:#2B3675"></i>Ads Management</h1>
  <button class="btn btn-sm btn-primary" id="btnAddAd"><i class="fas fa-plus me-1"></i>Add Ad</button>
</div>
<div class="content">
  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0 align-middle">
        <thead><tr><th style="width:80px">Image</th><th>Title</th><th>Link</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($ads as $ad): ?>
          <tr>
            <td>
              <?php if ($ad['image']): ?>
                <img src="<?= htmlspecialchars($ad['image']) ?>" alt="" style="width:64px;height:44px;object-fit:cover;border-radius:6px;border:1px solid #e5e7eb">
              <?php else: ?>
                <span class="text-muted small">No image</span>
              <?php endif; ?>
            </td>
            <td class="fw-bold"><?= htmlspecialchars($ad['title'] ?: '(untitled)') ?></td>
            <td>
              <?php if ($ad['content']): ?>
                <a href="<?= htmlspecialchars($ad['content']) ?>" target="_blank" class="text-primary small text-truncate d-block" style="max-width:200px"><?= htmlspecialchars($ad['content']) ?></a>
              <?php else: ?>
                <span class="text-muted small">—</span>
              <?php endif; ?>
            </td>
            <td class="text-muted small"><?= date('M j, Y', strtotime($ad['date'])) ?></td>
            <td>
              <button class="btn btn-sm btn-outline-primary btn-edit-ad" data-id="<?= $ad['id'] ?>" title="Edit"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-del-ad ms-1"
                data-id="<?= $ad['id'] ?>"
                data-title="<?= htmlspecialchars($ad['title'] ?: 'this ad', ENT_QUOTES) ?>"
                title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$ads): ?><tr><td colspan="5" class="text-center text-muted py-4">No ads yet. Click "Add Ad" to create one.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-white text-muted small"><?= count($ads) ?> ad(s)</div>
  </div>
</div>

<!-- Ad Modal -->
<div class="modal fade" id="adModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title" id="adModalTitle">Add Ad</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="adId">
        <input type="hidden" id="adSlug">
        <input type="hidden" id="existingImage">

        <!-- Image upload -->
        <div class="mb-3">
          <label class="form-label small fw-bold">Ad Image *</label>
          <div id="imgPreviewWrap" style="display:none;margin-bottom:10px">
            <img id="imgPreview" src="" alt="Preview" style="max-height:200px;border-radius:8px;border:1px solid #e5e7eb;object-fit:cover">
            <div class="text-muted small mt-1" id="imgCurrentLabel"></div>
          </div>
          <input type="file" id="adImage" class="form-control" accept="image/jpeg,image/png,image/gif,image/webp">
          <div class="form-text">JPG / PNG / GIF / WEBP — max 5 MB. Leave blank to keep existing image when editing.</div>
        </div>

        <div class="mb-3">
          <label class="form-label small fw-bold">Title <span class="text-muted fw-normal">(optional — for admin reference)</span></label>
          <input type="text" id="adTitle" class="form-control" placeholder="e.g. Qatar Hiring Drive – May 2026">
        </div>

        <div class="mb-3">
          <label class="form-label small fw-bold">Link URL <span class="text-muted fw-normal">(optional — where clicking the ad goes)</span></label>
          <input type="url" id="adLink" class="form-control" placeholder="https://…">
        </div>

        <div class="mb-3">
          <label class="form-label small fw-bold">Date</label>
          <input type="text" id="adDate" class="form-control" placeholder="DD/MM/YYYY" maxlength="10" value="<?= date('d/m/Y') ?>" oninput="autoDate(event)">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="saveAd"><i class="fas fa-save me-1"></i>Save Ad</button>
      </div>
    </div>
  </div>
</div>

<script>
function fmtDMY(ymd) { if (!ymd) return ''; const [y,m,d] = ymd.split('-'); return `${d}/${m}/${y}`; }
function parseDMY(dmy) { if (!dmy || dmy.length < 10) return dmy; const [d,m,y] = dmy.split('/'); return `${y}-${m}-${d}`; }
function autoDate(e) { let v = e.target.value.replace(/\D/g,''); if (v.length>2) v=v.slice(0,2)+'/'+v.slice(2); if (v.length>5) v=v.slice(0,5)+'/'+v.slice(5); e.target.value=v.slice(0,10); }

function clearAdForm() {
  document.getElementById('adId').value = '';
  document.getElementById('adSlug').value = '';
  document.getElementById('existingImage').value = '';
  document.getElementById('adTitle').value = '';
  document.getElementById('adLink').value = '';
  const t=new Date(); document.getElementById('adDate').value = String(t.getDate()).padStart(2,'0')+'/'+String(t.getMonth()+1).padStart(2,'0')+'/'+t.getFullYear();
  document.getElementById('adImage').value = '';
  document.getElementById('imgPreviewWrap').style.display = 'none';
  document.getElementById('imgPreview').src = '';
  document.getElementById('imgCurrentLabel').textContent = '';
}

// Live image preview when file selected
document.getElementById('adImage').addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('imgPreview').src = e.target.result;
    document.getElementById('imgCurrentLabel').textContent = 'New image selected: ' + file.name;
    document.getElementById('imgPreviewWrap').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

document.getElementById('btnAddAd').addEventListener('click', () => {
  clearAdForm();
  document.getElementById('adModalTitle').textContent = 'Add Ad';
  new bootstrap.Modal(document.getElementById('adModal')).show();
});

document.querySelectorAll('.btn-edit-ad').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('adModalTitle').textContent = 'Edit Ad';
    fetch('ads.php?get=' + btn.dataset.id)
      .then(r => r.json())
      .then(ad => {
        document.getElementById('adId').value       = ad.id;
        document.getElementById('adSlug').value     = ad.slug;
        document.getElementById('adTitle').value    = ad.title || '';
        document.getElementById('adLink').value     = ad.content || '';
        document.getElementById('adDate').value     = fmtDMY(ad.date);
        document.getElementById('existingImage').value = ad.image || '';
        document.getElementById('adImage').value   = '';
        if (ad.image) {
          document.getElementById('imgPreview').src = ad.image;
          document.getElementById('imgCurrentLabel').textContent = 'Current image — upload a new file to replace';
          document.getElementById('imgPreviewWrap').style.display = 'block';
        } else {
          document.getElementById('imgPreviewWrap').style.display = 'none';
        }
        new bootstrap.Modal(document.getElementById('adModal')).show();
      });
  });
});

document.getElementById('saveAd').addEventListener('click', () => {
  const existingImage = document.getElementById('existingImage').value;
  const imageFile     = document.getElementById('adImage').files[0];
  if (!imageFile && !existingImage) { alert('Please upload an image.'); return; }

  const fd = new FormData();
  fd.append('action',         'save');
  fd.append('id',             document.getElementById('adId').value);
  fd.append('slug',           document.getElementById('adSlug').value);
  fd.append('title',          document.getElementById('adTitle').value);
  fd.append('link_url',       document.getElementById('adLink').value);
  fd.append('date',           parseDMY(document.getElementById('adDate').value));
  fd.append('existing_image', existingImage);
  if (imageFile) fd.append('ad_image', imageFile);

  const btn = document.getElementById('saveAd');
  btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Saving…';

  fetch('ads.php', { method: 'POST', body: fd })
    .then(r => r.json())
    .then(d => {
      if (d.ok) location.reload();
      else { alert('Error: ' + d.error); btn.disabled = false; btn.innerHTML = '<i class="fas fa-save me-1"></i>Save Ad'; }
    })
    .catch(() => { alert('Server error.'); btn.disabled = false; btn.innerHTML = '<i class="fas fa-save me-1"></i>Save Ad'; });
});

document.querySelectorAll('.btn-del-ad').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm('Delete "' + btn.dataset.title + '"? The image file will also be deleted.')) return;
    const fd = new FormData();
    fd.append('action', 'delete');
    fd.append('id', btn.dataset.id);
    fetch('ads.php', { method: 'POST', body: fd })
      .then(r => r.json())
      .then(d => { if (d.ok) location.reload(); else alert('Error: ' + d.error); })
      .catch(() => alert('Server error.'));
  });
});
</script>
<?php require '_foot.php'; ?>
