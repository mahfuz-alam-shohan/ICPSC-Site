(document => {
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.circular-gallery');
    if (!wrap) return;
    const imgs = Array.from(wrap.querySelectorAll('img'));
    if (!imgs.length) return;
    let current = 0;

    const render = () => {
      const isMobile = window.innerWidth < 640;
      const max = isMobile ? 1 : 2; // visible neighbors on each side
      imgs.forEach((img, i) => {
        const diff = i - current;
        const ad = Math.abs(diff);
        if (ad > max) {
          img.style.opacity = '0';
          img.style.transform = `translate(-50%, -50%) translateX(${diff * 100}%) scale(0.4)`;
          img.style.pointerEvents = 'none';
        } else {
          const scale = 1 - 0.2 * ad;
          const contrast = 1 - 0.3 * ad;
          const offsetY = isMobile ? ad * 10 : 0;
          img.style.opacity = '1';
          img.style.transform = `translate(-50%, -50%) translateX(${diff * 100}%) translateY(${offsetY}px) scale(${scale})`;
          img.style.filter = `contrast(${contrast})`;
          img.style.zIndex = `${10 - ad}`;
          img.style.pointerEvents = 'auto';
        }
      });
    };

    const next = () => {
      current = (current + 1) % imgs.length;
      render();
    };
    const prev = () => {
      current = (current - 1 + imgs.length) % imgs.length;
      render();
    };

    let auto = setInterval(next, 3000);

    wrap.addEventListener('click', e => {
      const rect = wrap.getBoundingClientRect();
      if (e.clientX - rect.left < rect.width / 2) {
        prev();
      } else {
        next();
      }
      clearInterval(auto);
      auto = setInterval(next, 3000);
    });

    wrap.addEventListener('wheel', e => {
      e.preventDefault();
      if (e.deltaY > 0) next();
      else prev();
      clearInterval(auto);
      auto = setInterval(next, 3000);
    });

    window.addEventListener('resize', render);
    render();
  });
})(document);

