document.addEventListener('DOMContentLoaded', async () => {
  const root = window.location.pathname.includes('/pages/') ? '../' : '';
  const wrap = document.getElementById('studentGallery');
  if (!wrap) return;

  const autoPlay = wrap.dataset.autoplay === 'true';
  const limit = parseInt(wrap.dataset.limit, 10);

  try {
    let files = [];

    try {
      const res = await fetch(root + 'assets/student-galleries/videos.json');
      if (res.ok) {
        files = await res.json();
      }
    } catch (e) {}

    if (!files.length) {
      const res = await fetch(root + 'assets/student-galleries/');
      const html = await res.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      files = Array.from(temp.querySelectorAll('a'))
        .map(a => a.getAttribute('href'))
        .filter(h => h && h.match(/\.(mp4|webm)$/i));
    }

    if (!files.length) {
      const p = document.createElement('p');
      p.textContent = 'No videos found';
      p.className = 'text-center';
      wrap.appendChild(p);
      return;
    }

    if (!isNaN(limit)) {
      files = files.slice(0, limit);
    }

    const pauseOthers = cur => {
      wrap.querySelectorAll('video').forEach(v => {
        if (v !== cur) {
          v.pause();
          v.muted = true;
        }
      });
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (autoPlay) {
          if (e.isIntersecting) {
            e.target.play().catch(() => {});
            pauseOthers(e.target);
          } else {
            e.target.pause();
          }
        } else if (!e.isIntersecting) {
          e.target.pause();
        }
      });
    }, { threshold: 0.25 });

    files.forEach(f => {
      const card = document.createElement('div');
      card.className = 'video-card overflow-hidden rounded-lg shadow border border-gray-300 transition-shadow hover:shadow-lg aspect-video bg-black';

      const video = document.createElement('video');
      video.src = root + 'assets/student-galleries/' + f;
      video.preload = 'metadata';
      video.playsInline = true;
      video.muted = autoPlay;
      video.autoplay = autoPlay;
      video.loop = true;
      video.controls = true;
      video.className = 'w-full h-full object-cover';

      video.addEventListener('play', () => pauseOthers(video));

      io.observe(video);
      card.appendChild(video);
      wrap.appendChild(card);
    });
  } catch (e) {
    // swallow errors silently
  }
});
