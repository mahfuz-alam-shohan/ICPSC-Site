<?php $base = ''; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin Login</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=Inter:wght@500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="components/common.css"/>
</head>
<body class="text-slate-800 selection:bg-[#ffd166]/60">
  <?php include 'components/header.php'; ?>
  <main class="section">
    <div class="wrap max-w-sm mx-auto">
      <h1 class="text-2xl font-bold mb-4">Admin Login</h1>
      <form id="login-form" class="flex flex-col gap-2">
        <input id="password" type="password" class="border p-2 rounded" placeholder="Password" required />
        <button type="submit" class="cta green">Login</button>
      </form>
    </div>
  </main>
  <?php include 'components/footer.php'; ?>
  <script>
    document.getElementById('login-form').addEventListener('submit', async e => {
      e.preventDefault();
      const password = document.getElementById('password').value;
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        window.location.href = '/admin.php';
      } else {
        alert('Invalid password');
      }
    });
  </script>
</body>
</html>
