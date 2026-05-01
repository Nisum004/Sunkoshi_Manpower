<?php
define('SM_APP', true);
require '_auth.php';
require '_db.php';
$pageTitle = 'News';

function slugify($str) {
    return strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $str), '-'));
}

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $a = $_POST['action'];

    if ($a === 'save') {
        try {
            $slug = !empty($_POST['slug']) ? slugify($_POST['slug']) : slugify($_POST['title']);
            $date = !empty($_POST['published_at']) ? $_POST['published_at'] : date('Y-m-d');
            $data = [
                $slug, $_POST['title'], $_POST['excerpt'] ?? '',
                $_POST['content'], $_POST['category'] ?? 'News',
                $_POST['image'] ?? '', $_POST['tags'] ?? '',
                $date, $_POST['id'] ?? null
            ];
            if (empty($_POST['id'])) {
                $stmt = $pdo->prepare("INSERT INTO news (slug,title,excerpt,content,category,image,tags,date) VALUES (?,?,?,?,?,?,?,?)");
                $stmt->execute(array_slice($data, 0, 8));
            } else {
                $stmt = $pdo->prepare("UPDATE news SET slug=?,title=?,excerpt=?,content=?,category=?,image=?,tags=?,date=?,updated_at=NOW() WHERE id=?");
                $stmt->execute($data);
            }
            echo json_encode(['ok' => true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
        }
    }

    if ($a === 'delete') {
        try {
            $pdo->prepare("DELETE FROM news WHERE id=?")->execute([$_POST['id']]);
            echo json_encode(['ok' => true]); exit;
        } catch (Exception $e) {
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]); exit;
        }
    }
}

// GET single for edit
if (isset($_GET['get']) && is_numeric($_GET['get'])) {
    $row = $pdo->prepare("SELECT * FROM news WHERE id=?");
    $row->execute([$_GET['get']]);
    echo json_encode($row->fetch()); exit;
}

$news = $pdo->query("SELECT id,slug,title,category,tags,date FROM news ORDER BY date DESC")->fetchAll();
$categories = ['Jobs','Announcement','Notice','News'];
?>
<?php require '_head.php'; ?>
<?php require '_nav.php'; ?>
<div class="topbar">
  <h1><i class="fas fa-newspaper me-2" style="color:#2B3675"></i>News &amp; Articles</h1>
  <button class="btn btn-sm btn-primary" id="btnAddNews"><i class="fas fa-plus me-1"></i>Add Article</button>
</div>
<div class="content">
  <div class="card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead><tr><th>Title</th><th>Slug</th><th>Category</th><th>Tags</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($news as $n): ?>
          <tr>
            <td class="fw-bold"><?= htmlspecialchars($n['title']) ?></td>
            <td><code><?= htmlspecialchars($n['slug']) ?></code></td>
            <td><?= htmlspecialchars($n['category']) ?></td>
            <td><small class="text-muted"><?= htmlspecialchars($n['tags']) ?></small></td>
            <td class="text-muted small"><?= date('M j, Y', strtotime($n['date'])) ?></td>
            <td>
              <button class="btn btn-sm btn-outline-primary btn-edit-news" data-id="<?= $n['id'] ?>" title="Edit"><i class="fas fa-edit"></i></button>
              <button class="btn btn-sm btn-outline-danger btn-del-news ms-1" data-id="<?= $n['id'] ?>" data-title="<?= htmlspecialchars($n['title'], ENT_QUOTES) ?>" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$news): ?><tr><td colspan="6" class="text-center text-muted py-4">No articles found.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
    <div class="card-footer bg-white text-muted small"><?= count($news) ?> article(s)</div>
  </div>
</div>

<!-- News Modal -->
<div class="modal fade" id="newsModal" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header" style="background:#2B3675;color:#fff">
        <h5 class="modal-title" id="newsModalTitle">Add Article</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="newsId">
        <div class="row g-3">
          <div class="col-md-9">
            <label class="form-label small fw-bold">Title *</label>
            <input type="text" id="newsTitle" class="form-control" required>
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">Published Date</label>
            <input type="text" id="newsDate" class="form-control" placeholder="DD/MM/YYYY" maxlength="10" value="<?= date('d/m/Y') ?>" oninput="autoDate(event)">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Slug <span class="text-muted fw-normal">(auto-generated if blank)</span></label>
            <input type="text" id="newsSlug" class="form-control" placeholder="my-article-title">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Category</label>
            <select id="newsCat" class="form-select">
              <?php foreach ($categories as $c): ?><option><?= $c ?></option><?php endforeach; ?>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Excerpt <span class="text-muted fw-normal">(short summary, ~2 sentences)</span></label>
            <textarea id="newsExcerpt" class="form-control" rows="2"></textarea>
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Content <span class="text-muted fw-normal">(HTML allowed)</span></label>
            <textarea id="newsContent" class="form-control" rows="12"></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Tags <span class="text-muted fw-normal">(comma-separated)</span></label>
            <input type="text" id="newsTags" class="form-control" placeholder="recruitment, nepal, qatar">
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Image URL <span class="text-muted fw-normal">(optional — leave blank to use default)</span></label>
            <input type="text" id="newsImage" class="form-control" placeholder="https://…">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="saveNews"><i class="fas fa-save me-1"></i>Save Article</button>
      </div>
    </div>
  </div>
</div>

<script>
function fmtDMY(ymd) { if (!ymd) return ''; const [y,m,d] = ymd.split('-'); return `${d}/${m}/${y}`; }
function parseDMY(dmy) { if (!dmy || dmy.length < 10) return dmy; const [d,m,y] = dmy.split('/'); return `${y}-${m}-${d}`; }
function autoDate(e) { let v = e.target.value.replace(/\D/g,''); if (v.length>2) v=v.slice(0,2)+'/'+v.slice(2); if (v.length>5) v=v.slice(0,5)+'/'+v.slice(5); e.target.value=v.slice(0,10); }

function clearNewsForm() {
  document.getElementById('newsId').value = '';
  document.getElementById('newsTitle').value = '';
  document.getElementById('newsSlug').value = '';
  const t=new Date(); document.getElementById('newsDate').value = String(t.getDate()).padStart(2,'0')+'/'+String(t.getMonth()+1).padStart(2,'0')+'/'+t.getFullYear();
  document.getElementById('newsExcerpt').value = '';
  document.getElementById('newsContent').value = '';
  document.getElementById('newsTags').value = '';
  document.getElementById('newsImage').value = '';
}

document.getElementById('btnAddNews').addEventListener('click', () => {
  clearNewsForm();
  document.getElementById('newsModalTitle').textContent = 'Add Article';
  const modal = new bootstrap.Modal(document.getElementById('newsModal'));
  modal.show();
});

document.querySelectorAll('.btn-edit-news').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('newsModalTitle').textContent = 'Edit Article';
    fetch('news.php?get=' + btn.dataset.id)
      .then(r => r.json())
      .then(n => {
        document.getElementById('newsId').value = n.id;
        document.getElementById('newsTitle').value = n.title;
        document.getElementById('newsSlug').value = n.slug;
        document.getElementById('newsDate').value = fmtDMY(n.date);
        document.getElementById('newsExcerpt').value = n.excerpt || '';
        document.getElementById('newsContent').value = n.content || '';
        document.getElementById('newsTags').value = n.tags || '';
        document.getElementById('newsImage').value = n.image || '';
        document.getElementById('newsCat').value = n.category || 'News';
        const modal = new bootstrap.Modal(document.getElementById('newsModal'));
        modal.show();
      });
  });
});

document.getElementById('saveNews').addEventListener('click', () => {
  const title = document.getElementById('newsTitle').value.trim();
  if (!title) { alert('Title is required.'); return; }
  const fd = new FormData();
  fd.append('action', 'save');
  fd.append('id', document.getElementById('newsId').value);
  fd.append('title', title);
  fd.append('slug', document.getElementById('newsSlug').value);
  fd.append('published_at', parseDMY(document.getElementById('newsDate').value));
  fd.append('excerpt', document.getElementById('newsExcerpt').value);
  fd.append('content', document.getElementById('newsContent').value);
  fd.append('category', document.getElementById('newsCat').value);
  fd.append('tags', document.getElementById('newsTags').value);
  fd.append('image', document.getElementById('newsImage').value);
  fetch('news.php', {method:'POST', body:fd})
    .then(r => r.json())
    .then(d => { if(d.ok) location.reload(); else alert('Error: ' + d.error); })
    .catch(() => alert('Server error — check PHP error logs.'));
});

document.querySelectorAll('.btn-del-news').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!confirm(`Delete article "${btn.dataset.title}"? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append('action','delete');
    fd.append('id', btn.dataset.id);
    fetch('news.php', {method:'POST', body:fd})
      .then(r => r.json())
      .then(d => { if(d.ok) location.reload(); else alert('Error: ' + d.error); })
      .catch(() => alert('Server error.'));
  });
});
</script>
<?php require '_foot.php'; ?>
