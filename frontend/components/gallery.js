(document => {
  document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.circular-gallery');
    if (!wrap) return;
    const imgs = wrap.querySelectorAll('img');
    const total = imgs.length;
    if (!total) return;
    const step = 360 / total;
    let angle = 0;
    let radius = wrap.offsetWidth / 2.5;

    const updateRadius = () => {
      radius = wrap.offsetWidth / 2.5;
    };
    window.addEventListener('resize', updateRadius);

    const render = () => {
      imgs.forEach((img, i) => {
        const theta = i * step + angle;
        const cos = Math.cos(theta * Math.PI / 180);
        const factor = (cos + 1) / 2; // 0 at back, 1 at front
        const scale = 0.6 + 0.4 * factor;
        img.style.transform = `translate(-50%, -50%) rotateY(${theta}deg) translateZ(${radius}px) scale(${scale})`;
        img.style.opacity = (0.3 + 0.7 * factor).toString();
        img.style.filter = `contrast(${0.6 + 0.4 * factor})`;
        img.style.zIndex = Math.round(factor * 1000);
      });
      angle -= 0.3; // rotate right to left
      requestAnimationFrame(render);
    };

    render();
  });
})(document);
