<?php $base = '..'; ?>
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Clubs & Societies - Ispahani Cantonment Public School & College</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&family=Inter:wght@500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <link rel="stylesheet" href="../components/common.css"/>
  </head>
<body class="text-slate-800 selection:bg-[#ffd166]/60">
  <div id="decor"></div>
<?php include '../components/header.php'; ?>

  <section class="club-hero"><div class="wrap"><h1 class="grad">Clubs &amp; Societies</h1></div></section>

  <section id="debating" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/debating/cover.png" alt="Debating Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-comments"></i>Debating Club</h2><p class="muted desc" data-src="../assets/clubs/debating/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="science" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/science/cover.png" alt="Science Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-flask"></i>Science Club</h2><p class="muted desc" data-src="../assets/clubs/science/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="ict" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/ict/cover.png" alt="ICT Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-computer"></i>ICT Club</h2><p class="muted desc" data-src="../assets/clubs/ict/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="art" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/art/cover.png" alt="Art Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-palette"></i>Art Club</h2><p class="muted desc" data-src="../assets/clubs/art/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="gk" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/gk/cover.png" alt="General Knowledge Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-lightbulb"></i>General Knowledge Club</h2><p class="muted desc" data-src="../assets/clubs/gk/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="math" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/math/cover.png" alt="Math Olympiad Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-square-root-variable"></i>Math Olympiad Club</h2><p class="muted desc" data-src="../assets/clubs/math/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="language" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/language/cover.png" alt="Language &amp; Literature Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-book-open"></i>Language &amp; Literature Club</h2><p class="muted desc" data-src="../assets/clubs/language/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="music" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/music/cover.png" alt="Music &amp; Dance Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-music"></i>Music &amp; Dance Club</h2><p class="muted desc" data-src="../assets/clubs/music/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="sports" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/sports/cover.png" alt="Sports Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-football"></i>Sports Club</h2><p class="muted desc" data-src="../assets/clubs/sports/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>

  <section id="taekwondo" class="section club"><div class="wrap"><div class="club-card"><img src="../assets/clubs/taekwondo/cover.png" alt="Taekwondo Club"><div class="club-info"><h2 class="flex items-center gap-2"><i class="fa-solid fa-user-ninja"></i>Taekwondo Club</h2><p class="muted desc" data-src="../assets/clubs/taekwondo/desc.txt"></p><div class="btns"><a href="#" class="ghost">Learn More</a><a href="#" class="cta green">Join Club</a></div></div></div></div></section>


  <?php include '../components/footer.php'; ?>
  <script src="../components/common.js"></script>
  <script>document.querySelectorAll('.desc[data-src]').forEach(p=>fetch(p.dataset.src).then(r=>r.text()).then(t=>p.textContent=t.trim()).catch(()=>{}));</script>
</body>
</html>
