<?php
$currentPage = basename($_SERVER['PHP_SELF'], '.php');
require_once '_db.php';
$newApps   = $pdo->query("SELECT COUNT(*) FROM applications WHERE status='New'")->fetchColumn();
$newCon    = $pdo->query("SELECT COUNT(*) FROM contacts WHERE read_status=0")->fetchColumn();
$newEmp    = $pdo->query("SELECT COUNT(*) FROM employer_inquiries WHERE read_status=0")->fetchColumn();
?>
<div class="sidebar">
  <div class="sidebar-brand">
    <img src="/images/logo.png" alt="Logo">
    <span>Sunkoshi</span><br>
    <span class="sidebar-sub">Admin Panel</span>
  </div>
  <nav>
    <a href="dashboard.php" class="nav-link <?= $currentPage==='dashboard'?'active':'' ?>"><i class="fas fa-chart-line"></i> Dashboard</a>
    <a href="applications.php" class="nav-link <?= $currentPage==='applications'?'active':'' ?>"><i class="fas fa-file-alt"></i> Applications <?php if($newApps>0) echo "<span class='badge-count'>$newApps</span>"; ?></a>
    <a href="jobs.php" class="nav-link <?= $currentPage==='jobs'?'active':'' ?>"><i class="fas fa-briefcase"></i> Jobs</a>
    <a href="news.php" class="nav-link <?= $currentPage==='news'?'active':'' ?>"><i class="fas fa-newspaper"></i> News</a>
    <a href="contacts.php" class="nav-link <?= $currentPage==='contacts'?'active':'' ?>"><i class="fas fa-envelope"></i> Contacts <?php if($newCon>0) echo "<span class='badge-count'>$newCon</span>"; ?></a>
    <a href="employers.php" class="nav-link <?= $currentPage==='employers'?'active':'' ?>"><i class="fas fa-building"></i> Employers <?php if($newEmp>0) echo "<span class='badge-count'>$newEmp</span>"; ?></a>
  </nav>
  <div class="sidebar-footer">
    <a href="logout.php" class="nav-link" style="color:rgba(255,255,255,0.5)!important"><i class="fas fa-sign-out-alt"></i> Logout</a>
  </div>
</div>
<div class="main">
