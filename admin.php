<?php $base = ''; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=Inter:wght@500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <link rel="stylesheet" href="components/common.css"/>
</head>
<body class="text-slate-800 selection:bg-[#ffd166]/60">
  <?php include 'components/header.php'; ?>
  <main class="section">
    <div class="wrap">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form id="user-form" class="flex flex-col sm:flex-row gap-2 mb-6">
        <input id="username" class="border p-2 rounded" placeholder="Username" required>
        <input id="role" class="border p-2 rounded" placeholder="Role" required>
        <button type="submit" class="cta green">Add User</button>
      </form>
      <ul id="user-list" class="space-y-2"></ul>
    </div>
  </main>
  <?php include 'components/footer.php'; ?>
  <script src="components/common.js"></script>
  <script>
    async function loadUsers() {
      const res = await fetch('/api/users');
      const users = await res.json();
      const list = document.getElementById('user-list');
      list.innerHTML = '';
      users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.id}: ${u.username} (${u.role})`;
        list.appendChild(li);
      });
    }
    document.getElementById('user-form').addEventListener('submit', async e => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const role = document.getElementById('role').value;
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, role })
      });
      e.target.reset();
      loadUsers();
    });
    loadUsers();
  </script>
</body>
</html>
