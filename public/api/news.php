<?php
define('SM_APP', true);
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

require_once __DIR__ . '/db.php';

$slug = trim($_GET['slug'] ?? '');

if ($slug) {
    $stmt = $pdo->prepare("SELECT * FROM news WHERE slug = ?");
    $stmt->execute([$slug]);
    $article = $stmt->fetch();
    if (!$article) { http_response_code(404); echo json_encode(['success'=>false,'message'=>'Not found']); exit; }
    $article['tags'] = array_values(array_filter(array_map('trim', explode(',', $article['tags']))));
    echo json_encode(['success'=>true,'article'=>$article]);
} else {
    $articles = $pdo->query("SELECT * FROM news ORDER BY date DESC")->fetchAll();
    foreach ($articles as &$a) {
        $a['tags'] = array_values(array_filter(array_map('trim', explode(',', $a['tags']))));
    }
    echo json_encode(['success'=>true,'articles'=>$articles]);
}
