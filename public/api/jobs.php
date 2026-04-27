<?php
define('SM_APP', true);
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

require_once __DIR__ . '/db.php';

$id = trim($_GET['id'] ?? '');

if ($id) {
    $stmt = $pdo->prepare("SELECT * FROM jobs WHERE id = ?");
    $stmt->execute([$id]);
    $job = $stmt->fetch();
    if (!$job) { http_response_code(404); echo json_encode(['success'=>false,'message'=>'Not found']); exit; }
    $job['requirements'] = array_values(array_filter(explode("\n", $job['requirements'])));
    $job['open'] = (bool)$job['open'];
    echo json_encode(['success'=>true,'job'=>$job]);
} else {
    $onlyOpen = isset($_GET['open']) ? (int)$_GET['open'] : null;
    $sql = "SELECT * FROM jobs" . ($onlyOpen !== null ? " WHERE open = $onlyOpen" : "") . " ORDER BY created_at DESC";
    $jobs = $pdo->query($sql)->fetchAll();
    foreach ($jobs as &$j) {
        $j['requirements'] = array_values(array_filter(explode("\n", $j['requirements'])));
        $j['open'] = (bool)$j['open'];
    }
    echo json_encode(['success'=>true,'jobs'=>$jobs]);
}
