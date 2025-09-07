document.addEventListener('DOMContentLoaded', async () => {
  const root = window.location.pathname.includes('/pages/') ? '../' : '';
  const wrap = document.getElementById('studentGallery');
  if (!wrap) return;

  const autoPlay = wrap.dataset.autoplay === 'true';
  const limit = parseInt(wrap.dataset.limit, 10);
  const linkTarget = wrap.dataset.link ? root + wrap.dataset.link : null;

  try {
    const res = await fetch(root + 'assets/student-galleries/');
    const html = await res.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;
    let files = Array.from(temp.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(h => h && h.match(/\.(mp4|webm)$/i));

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
        if (v !== cur) v.pause();
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
    }, { threshold: 0.5 });

    files.forEach(f => {
      const card = document.createElement(linkTarget ? 'a' : 'div');
      if (linkTarget) card.href = linkTarget;
      card.className = 'mb-4 break-inside-avoid overflow-hidden rounded-lg shadow transition-shadow hover:shadow-lg';

      const video = document.createElement('video');
      video.src = root + 'assets/student-galleries/' + f;
      video.preload = 'metadata';
      video.playsInline = true;
      video.muted = autoPlay;
      video.controls = !autoPlay;
      video.className = 'w-full h-full';

      video.addEventListener('play', () => pauseOthers(video));
      video.addEventListener('loadedmetadata', () => {
        card.style.aspectRatio = `${video.videoWidth}/${video.videoHeight}`;
      });

      io.observe(video);
      card.appendChild(video);
      wrap.appendChild(card);
    });
  } catch (e) {
    // swallow errors silently
  }
});

