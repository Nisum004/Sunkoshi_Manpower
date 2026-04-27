<?php
// ─────────────────────────────────────────────────────────────────────────────
// SETUP — Visit sunkoshimanpower.com/admin/setup.php ONCE to initialise DB.
// DELETE THIS FILE immediately after running.
// ─────────────────────────────────────────────────────────────────────────────
define('SM_APP', true);
require_once '../api/db.php';

$log = [];

// ── Tables ────────────────────────────────────────────────────────────────────
$tables = [
"CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

"CREATE TABLE IF NOT EXISTS `jobs` (
  `id` VARCHAR(20) NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `flag` VARCHAR(10) DEFAULT '',
  `category` VARCHAR(100) NOT NULL,
  `vacancies` INT DEFAULT 1,
  `salary` VARCHAR(200) DEFAULT '',
  `benefits` VARCHAR(500) DEFAULT '',
  `description` TEXT,
  `requirements` TEXT,
  `deadline` DATE,
  `open` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

"CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(500) NOT NULL,
  `category` ENUM('Jobs','Announcement','Notice','News') DEFAULT 'News',
  `date` DATE NOT NULL,
  `excerpt` TEXT,
  `content` LONGTEXT,
  `image` VARCHAR(500) DEFAULT '',
  `tags` VARCHAR(500) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

"CREATE TABLE IF NOT EXISTS `applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ref_no` VARCHAR(20) UNIQUE,
  `full_name` VARCHAR(255) NOT NULL,
  `dob` VARCHAR(20) DEFAULT '',
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT '',
  `district` VARCHAR(255) NOT NULL,
  `education` VARCHAR(100) DEFAULT '',
  `preferred_country` VARCHAR(100) NOT NULL,
  `job_category` VARCHAR(100) NOT NULL,
  `job_ref` VARCHAR(50) DEFAULT '',
  `experience` VARCHAR(100) DEFAULT '',
  `passport_status` VARCHAR(100) NOT NULL,
  `experience_details` TEXT,
  `status` ENUM('New','Reviewed','Shortlisted','Rejected','Deployed') DEFAULT 'New',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

"CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT '',
  `subject` VARCHAR(500) NOT NULL,
  `message` TEXT NOT NULL,
  `read_status` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",

"CREATE TABLE IF NOT EXISTS `employer_inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) DEFAULT '',
  `phone` VARCHAR(50) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `sector` VARCHAR(100) DEFAULT '',
  `job_title` VARCHAR(255) NOT NULL,
  `workers_needed` VARCHAR(50) NOT NULL,
  `salary` VARCHAR(100) DEFAULT '',
  `deployment_date` VARCHAR(20) DEFAULT '',
  `benefits` TEXT,
  `requirements` TEXT,
  `read_status` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
];

foreach ($tables as $sql) {
    $pdo->exec($sql);
    $log[] = '✓ Table created/verified';
}

// ── Seed Jobs ─────────────────────────────────────────────────────────────────
$jobs = [
  ['J001','Electrician (LT & HT)','Saudi Arabia','sa','Skilled',15,'SAR 1,200 – 1,500 / month','Free food, accommodation & transport','We are recruiting qualified electricians for a reputed construction company in Saudi Arabia.','Minimum 2 years experience'."\n".'Valid trade certificate preferred'."\n".'Age: 21 – 40 years'."\n".'Medical fitness required','2025-05-30',1],
  ['J002','Mason / Tile Fixer','Qatar','qa','Skilled',25,'QAR 1,000 – 1,300 / month','Free accommodation & transport','Immediate requirement for skilled masons and tile fixers for ongoing construction projects in Doha, Qatar.','Minimum 2 years tiling/masonry experience'."\n".'CTEVT trade test certificate preferred'."\n".'Age: 20 – 40 years','2025-06-15',1],
  ['J003','Kitchen Helper / Assistant Cook','UAE','ae','Semi-Skilled',30,'AED 900 – 1,100 / month','Free food, accommodation & transport','Required for a well-established catering company in Dubai. Freshers with basic kitchen knowledge are welcome.','Basic kitchen experience preferred'."\n".'English communication'."\n".'Age: 20 – 38 years','2025-05-20',1],
  ['J004','Factory Worker (Technical Trainee)','Japan','jp','Trainee',10,'¥ As per Japanese labour law (~NPR 80,000–100,000/month)','Accommodation, health insurance & language training','Exciting opportunity to work as a technical trainee in Japan under the JITCO cooperative programme.','Age: 18 – 35 years'."\n".'Minimum SLC/SEE passed'."\n".'Japanese language N4 preferred'."\n".'No criminal record','2025-07-30',1],
  ['J005','General Labourer','Malaysia','my','Unskilled',50,'MYR 1,200 – 1,400 / month','Free accommodation & transport','Large requirement for general factory and plantation labourers for established Malaysian companies.','No experience required'."\n".'Age: 18 – 40 years'."\n".'Medically fit'."\n".'Valid passport required','2025-06-10',1],
  ['J006','Welder (Gas & Electric)','Saudi Arabia','sa','Skilled',12,'SAR 1,400 – 1,800 / month','Free food, accommodation & transport + OT','Reputed oil & gas company in Saudi Arabia requires qualified welders.','Minimum 3 years welding experience'."\n".'6G/3G certification preferred'."\n".'Age: 22 – 42 years','2025-05-25',1],
  ['J000','Security Guard','UAE','ae','Skilled',0,'AED 1,200 / month','Free accommodation','Position filled.','Ex-Army or Police background','2025-01-15',0],
];

$jobStmt = $pdo->prepare("INSERT IGNORE INTO jobs (id,title,country,flag,category,vacancies,salary,benefits,description,requirements,deadline,open) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
foreach ($jobs as $j) { $jobStmt->execute($j); }
$log[] = '✓ Jobs seeded (' . count($jobs) . ')';

// ── Seed News ─────────────────────────────────────────────────────────────────
$newsItems = [
  ['new-job-openings-malaysia-2025','New Job Openings in Malaysia — Manufacturing Sector (2025)','Jobs','2025-04-10','Sunkoshi Manpower has secured 120 new positions for factory operators and general workers in Malaysia. Interested candidates should register immediately.','Sunkoshi Manpower Service is pleased to announce new job openings in Malaysia for the manufacturing sector.','https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80&auto=format&fit=crop','Malaysia,Manufacturing,Factory Operator'],
  ['japan-ssw-new-quota-2025','Japan Specified Skilled Worker (SSW) — New Quota Released for Nepal','Announcement','2025-03-22','The Japanese government has released a new SSW quota for Nepali workers in manufacturing and food processing sectors. Applications open now.','The Japanese government has released a new allocation under the Specified Skilled Worker (SSW) program for Nepali workers.','https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80&auto=format&fit=crop','Japan,SSW,Skilled Worker'],
  ['sunkoshi-30-years-celebration','Sunkoshi Manpower Celebrates 30 Years of Excellence','News','2025-02-15','Founded in 1995, Sunkoshi Manpower marks three decades of connecting Nepali talent with global opportunities — 10,000+ workers placed across 6 countries.','Sunkoshi Manpower Service (P.) Ltd. proudly celebrates its 30th anniversary in 2025.','https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop','Anniversary,Milestone,Company News'],
  ['trade-test-schedule-q2-2025','Trade Test & Skill Evaluation Schedule — Q2 2025','Notice','2025-01-30','Trade tests for electricians, welders, masons, and other skilled workers are scheduled for April–June 2025. Register at our training center.','Sunkoshi Training Centre has announced the trade test schedule for Q2 2025.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop','Trade Test,Training,Skills'],
  ['free-orientation-gulf-workers-2025','Free Pre-Departure Orientation for Gulf-Bound Workers','Announcement','2024-12-20','Sunkoshi Manpower provides free pre-departure orientation covering destination country laws, worker rights, safety, and emergency contacts.','All workers departing through Sunkoshi Manpower receive a free, mandatory pre-departure orientation session.','https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop','Orientation,Gulf,Worker Rights'],
  ['kuwait-new-opportunities-2024','New Opportunities in Kuwait — Construction & Hospitality','Jobs','2024-11-05','Sunkoshi Manpower has received new demand letters for construction and hospitality positions in Kuwait. Both skilled and unskilled categories available.','Sunkoshi Manpower has received new demand letters from Kuwait for construction and hospitality workers.','https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop','Kuwait,Construction,Hospitality'],
];

$newsStmt = $pdo->prepare("INSERT IGNORE INTO news (slug,title,category,date,excerpt,content,image,tags) VALUES (?,?,?,?,?,?,?,?)");
foreach ($newsItems as $n) { $newsStmt->execute($n); }
$log[] = '✓ News seeded (' . count($newsItems) . ')';

// ── Admin user ────────────────────────────────────────────────────────────────
$adminUser = 'admin';
$adminPass = 'Sunkoshi@2025';   // CHANGE THIS after first login
$hash = password_hash($adminPass, PASSWORD_DEFAULT);

$check = $pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
$check->execute([$adminUser]);
if (!$check->fetch()) {
    $pdo->prepare("INSERT INTO admin_users (username, password_hash) VALUES (?,?)")->execute([$adminUser, $hash]);
    $log[] = '✓ Admin user created — username: <strong>' . $adminUser . '</strong> | password: <strong>' . $adminPass . '</strong>';
} else {
    $log[] = '⚠ Admin user already exists — skipped';
}

?><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Setup — Sunkoshi Manpower</title>
<style>body{font-family:Arial,sans-serif;max-width:600px;margin:60px auto;padding:20px;background:#f5f7fa}
.box{background:#fff;border-radius:12px;padding:32px;border:1px solid #e2e8f0}
h2{color:#2B3675;margin-top:0}li{padding:6px 0;font-size:0.95rem;border-bottom:1px solid #f0f0f0}
.warn{background:#FEF3C7;border:1px solid #F59E0B;border-radius:8px;padding:16px;margin-top:20px;color:#92400E;font-size:0.9rem}
a{color:#2B3675;font-weight:700}</style>
</head><body>
<div class="box">
  <h2>Setup Complete</h2>
  <ul><?php foreach ($log as $l) echo "<li>$l</li>"; ?></ul>
  <div class="warn">
    <strong>Important:</strong> Delete this file immediately!<br>
    Then go to <a href="/admin/">/admin/</a> and log in.<br><br>
    Change your password after first login via <em>Dashboard → Change Password</em>.
  </div>
</div>
</body></html>
