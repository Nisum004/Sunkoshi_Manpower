<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= $pageTitle ?? 'Admin' ?> — Sunkoshi Manpower</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
<style>
:root{--navy:#2B3675;--accent:#C8A84B}
body{background:#f0f2f7;font-family:'Segoe UI',sans-serif}
.sidebar{width:240px;min-height:100vh;background:var(--navy);position:fixed;top:0;left:0;z-index:100;display:flex;flex-direction:column}
.sidebar-brand{padding:24px 20px;border-bottom:1px solid rgba(255,255,255,0.1)}
.sidebar-brand img{width:36px;height:36px;object-fit:contain;margin-right:10px}
.sidebar-brand span{color:#fff;font-weight:700;font-size:1rem}
.sidebar-sub{color:rgba(255,255,255,0.45);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;margin-left:46px;margin-top:-2px}
.sidebar nav{flex:1;padding:12px 0}
.nav-link{color:rgba(255,255,255,0.7)!important;padding:10px 20px!important;display:flex;align-items:center;gap:10px;font-size:0.87rem;border-radius:0;transition:all 0.2s}
.nav-link:hover,.nav-link.active{color:#fff!important;background:rgba(255,255,255,0.1)!important}
.nav-link.active{border-left:3px solid var(--accent)}
.nav-link i{width:18px;text-align:center;font-size:0.9rem}
.badge-count{background:var(--accent);color:#1a1a1a;font-size:0.65rem;padding:2px 7px;border-radius:100px;font-weight:700;margin-left:auto}
.sidebar-footer{padding:16px 20px;border-top:1px solid rgba(255,255,255,0.1)}
.main{margin-left:240px;min-height:100vh}
.topbar{background:#fff;padding:14px 28px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between}
.topbar h1{margin:0;font-size:1.2rem;font-weight:700;color:var(--navy)}
.content{padding:28px}
.card{border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)}
.stat-card{border-radius:12px;padding:24px;color:#fff;display:flex;align-items:center;gap:16px}
.stat-icon{width:52px;height:52px;border-radius:10px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:1.3rem}
.table th{background:#f8fafc;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;font-weight:600;border-bottom:2px solid #e2e8f0}
.table td{font-size:0.87rem;vertical-align:middle}
.status-badge{padding:3px 10px;border-radius:100px;font-size:0.72rem;font-weight:700}
.status-New{background:#DBEAFE;color:#1E40AF}
.status-Reviewed{background:#FEF3C7;color:#92400E}
.status-Shortlisted{background:#D1FAE5;color:#065F46}
.status-Rejected{background:#FEE2E2;color:#991B1B}
.status-Deployed{background:#F3E8FF;color:#6B21A8}
@media(max-width:768px){.sidebar{width:100%;min-height:auto;position:relative}.main{margin-left:0}}
</style>
</head>
<body>
