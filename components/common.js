async function loadComponents(){
  const parts=location.pathname.split('/').filter(Boolean);
  const repo=parts[0]||'';
  const root=location.origin+(repo?`/${repo}/`:'/');
  const base=repo?`/${repo}`:'';
  const headerEl=document.getElementById('header');
  const footerEl=document.getElementById('footer');
  const [h,f]=await Promise.all([
    fetch(root+'components/header.html').then(r=>r.ok?r.text():'' ).catch(()=>''),
    fetch(root+'components/footer.html').then(r=>r.ok?r.text():'' ).catch(()=>''),
  ]);
  if(headerEl) headerEl.innerHTML=h.replace(/{{base}}/g,base);
  if(footerEl) footerEl.innerHTML=f.replace(/{{base}}/g,base);
  initCommon();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',loadComponents);
}else{
  loadComponents();
}

function initCommon(){
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
  const mast=document.getElementById('masthead'),r=document.documentElement;
  const updateMast=()=>{if(mast) r.style.setProperty('--mast-h',mast.offsetHeight+'px');};
  updateMast();
  if(mast){
    new ResizeObserver(updateMast).observe(mast);
    window.addEventListener('load',updateMast);
  }
  const mobileNav=document.getElementById('mobileNav');
  const handleResize=()=>{
    if(window.innerWidth>=768 && mobileNav && !mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
    updateMast();
  };
  window.addEventListener('resize',handleResize);
  const mobileToggle=document.getElementById('mobileToggle');
  if(mobileToggle && mobileNav){
    mobileToggle.addEventListener('click',()=>{mobileNav.classList.toggle('hidden');updateMast();});
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.classList.add('hidden');updateMast();}));
    mobileNav.querySelectorAll('.mhead').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const sub=btn.nextElementSibling;
        mobileNav.querySelectorAll('.msub').forEach(s=>{if(s!==sub){s.classList.remove('open');s.previousElementSibling.classList.remove('open');}});
        sub.classList.toggle('open');
        btn.classList.toggle('open');
        updateMast();
      });
    });
  }
  document.querySelectorAll('.mega').forEach(m=>{
    const panel=m.querySelector('.panel');
    let t;
    const open=()=>{clearTimeout(t);m.classList.add('open');if(mast) mast.classList.add('menu-open');};
    const close=()=>{t=setTimeout(()=>{m.classList.remove('open');if(!document.querySelector('.mega.open') && mast) mast.classList.remove('menu-open');},150);};
    if(panel){
      m.addEventListener('mouseenter',open);
      m.addEventListener('mouseleave',close);
      panel.addEventListener('mouseenter',open);
      panel.addEventListener('mouseleave',close);
    }
  });
  const msgModal=document.getElementById('msgModal'),msgText=document.getElementById('msgText'),msgClose=document.getElementById('msgClose'),msgTitle=document.getElementById('msgTitle');
  if(msgModal && msgClose){
    msgClose.addEventListener('click',()=>msgModal.classList.add('hidden'));
    msgModal.addEventListener('click',e=>{if(e.target===msgModal) msgModal.classList.add('hidden');});
  }
  document.querySelectorAll('.leader[data-info]').forEach(card=>{
    fetch(card.dataset.info).then(r=>r.text()).then(t=>{
      const [name,...msg]=t.split('\n');
      card.querySelector('.name').textContent=name.trim();
      const message=msg.join('\n').trim();
      card.querySelector('.chip').addEventListener('click',e=>{
        e.preventDefault();
        if(msgModal && msgText && msgTitle){
          msgTitle.textContent='Message from '+name.trim();
          msgText.textContent=message||'No message';
          msgModal.classList.remove('hidden');
        }
      });
    }).catch(()=>{});
  });
  (function(){const track=document.getElementById('tickerTrack');if(!track)return;track.innerHTML=track.innerHTML+track.innerHTML;})();
  const decor=document.getElementById('decor');
  if(decor){
    const types=['circle','square','triangle'];
    for(let i=0;i<12;i++){
      const d=document.createElement('div');
      d.className='shape '+types[i%3];
      d.style.left=Math.random()*100+'%';
      d.style.top=Math.random()*100+'%';
      decor.appendChild(d);
    }
  }
  const counters=document.querySelectorAll('.counter span[data-count]');
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,end=parseInt(el.dataset.count,10);let cur=0;const step=Math.ceil(end/80);const T=setInterval(()=>{cur+=step;if(cur>=end){cur=end;clearInterval(T)}el.textContent=cur.toLocaleString();},16);io.unobserve(el);}})},{threshold:.4});
  counters.forEach(c=>io.observe(c));
  document.querySelectorAll('.strip.loop').forEach(strip=>{const kids=[...strip.children];kids.forEach(el=>strip.appendChild(el.cloneNode(true)));let pos=0;const speed=parseInt(strip.dataset.speed||'40',10);let last=null,paused=false;const step=t=>{if(last===null) last=t;const dt=(t-last)/1000;last=t;if(!paused){pos+=speed*dt;if(pos>=strip.scrollWidth/2) pos=0;strip.scrollLeft=pos;}requestAnimationFrame(step)};strip.addEventListener('mouseenter',()=>paused=true);strip.addEventListener('mouseleave',()=>paused=false);requestAnimationFrame(step)});
  gsap.from('#masthead',{y:-60,opacity:0,duration:.6});
  const revealItems=document.querySelectorAll('.section,.card');
  const io2=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){gsap.to(e.target,{opacity:1,y:0,duration:.6});io2.unobserve(e.target);}})},{threshold:.2});
  revealItems.forEach(el=>{gsap.set(el,{opacity:0,y:40});io2.observe(el);});
  const loginModal=document.getElementById('loginModal'),loginNav=document.getElementById('loginNav'),loginNavM=document.getElementById('loginNavM'),loginOk=document.getElementById('loginOk'),loginCancel=document.getElementById('loginCancel');
  function openLogin(e){e.preventDefault();loginModal.classList.remove('hidden');}
  if(loginNav) loginNav.addEventListener('click',openLogin);
    if(loginNavM) loginNavM.addEventListener('click',e=>{openLogin(e);if(mobileNav) mobileNav.classList.add('hidden');updateMast();});
  if(loginCancel) loginCancel.addEventListener('click',()=>loginModal.classList.add('hidden'));
  if(loginOk) loginOk.addEventListener('click',()=>loginModal.classList.add('hidden'));
}
