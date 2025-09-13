gsap.registerPlugin(MotionPathPlugin);
document.addEventListener('DOMContentLoaded',initCommon);

function initCommon(){
  const root=window.location.pathname.includes('/pages/')?'../':'';
  document.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('selectstart',e=>e.preventDefault());
  document.addEventListener('dragstart',e=>e.preventDefault());
  document.addEventListener('copy',e=>e.preventDefault());
  document.addEventListener('cut',e=>e.preventDefault());
  document.querySelectorAll('[data-year]').forEach(el=>{el.textContent=new Date().getFullYear();});
  const mast=document.getElementById('masthead'),r=document.documentElement;
  const updateMast=()=>{if(mast) r.style.setProperty('--mast-h',mast.offsetHeight+'px');};
  updateMast();
  if(mast){
    new ResizeObserver(updateMast).observe(mast);
    window.addEventListener('load',updateMast);
  }
  const mobileNav=document.getElementById('mobileNav');
  const mainNav=document.querySelector('nav.nav');
  if(mainNav){
    const funMega=document.createElement('div');
    funMega.className='mega';
    funMega.innerHTML=`<button class="nav-btn" aria-haspopup="true"><i class="fa-solid fa-earth-americas"></i>Fun Zone</button><div class="panel"><div class="col"><a href="${root}index.html#overview">Overview</a><a href="${root}pages/solar-system.html">Solar System</a></div></div>`;
    const applyLink=mainNav.querySelector('a.nav-btn[href^="https://vortibd.com"]');
    mainNav.insertBefore(funMega, applyLink);
  }
  if(mobileNav){
    const funItem=document.createElement('div');
    funItem.className='mitem';
    funItem.innerHTML=`<button class="mhead"><i class="fa-solid fa-earth-americas"></i><span>Fun Zone</span></button><div class="msub"><a class="mlink" href="${root}index.html#overview">Overview</a><a class="mlink" href="${root}pages/solar-system.html">Solar System</a></div>`;
    const applyMobile=mobileNav.querySelector('a.mlink[href^="https://vortibd.com"]');
    mobileNav.insertBefore(funItem, applyMobile);
  }
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
  const closeMsg=()=>{
    if(msgModal){
      msgModal.classList.remove('open');
      document.body.style.overflow='';
      document.documentElement.style.overflow='';
    }
  };
  const openMsg=()=>{
    if(msgModal){
      msgModal.classList.add('open');
      document.body.style.overflow='hidden';
      document.documentElement.style.overflow='hidden';
    }
  };
  if(msgModal && msgClose){
    msgClose.addEventListener('click',closeMsg);
    msgModal.addEventListener('click',e=>{if(e.target===msgModal) closeMsg();});
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
          openMsg();
        }
      });
    }).catch(()=>{});
  });
  (function(){const track=document.getElementById('tickerTrack');if(!track)return;track.innerHTML=track.innerHTML+track.innerHTML;})();
  const applyFade=(wrap,rows)=>{
    if(!wrap) return;
    const calc=()=>{
      const card=wrap.querySelector(':scope > *');
      if(!card) return;
      const gap=parseFloat(getComputedStyle(wrap).gap)||0;
      const ch=card.getBoundingClientRect().height;
      wrap.style.maxHeight=(ch*rows+gap*(rows-1)+ch*0.2)+'px';
    };
    calc();
    window.addEventListener('resize',calc);
    window.addEventListener('load',calc);
  };

  const staffHome=document.getElementById('staffsHome');
  const staffWrap=document.getElementById('staffsAll');
  if(staffHome||staffWrap){
    fetch(root+'assets/staffs/info.txt').then(r=>r.text()).then(t=>{
      const staffs=t.split(/\n\s*\n/).map(block=>{
        const lines=block.trim().split(/\n/);
        if(!lines[0]) return null;
        const s={name:lines[0].trim()};
        for(let i=1;i<lines.length;i++){
          const [key,...rest]=lines[i].split(':');
          if(!key||rest.length===0) continue;
          s[key.trim().toLowerCase()]=rest.join(':').trim();
        }
        return s.id?s:null;
      }).filter(Boolean);
      const createCard=(s,full)=>{
        const card=document.createElement('div');
        if(full){
          card.className='staff-card flex items-center gap-4 p-6 rounded-xl shadow-md bg-white/80 backdrop-blur-sm border-l-8 border-[#14532d] hover:shadow-lg transition-transform hover:-translate-y-1';
        }else{
          card.className='staff-card flex flex-col items-center text-center p-6 rounded-xl shadow-md bg-white/80 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-transform hover:-translate-y-1 border-t-8 border-[#14532d]';
        }
        const img=document.createElement('img');
        img.src=root+'assets/staffs/pictures/'+s.id+'.jpg';
        img.alt=s.name;
        img.loading='eager';
        img.decoding='async';
        img.className=full?'w-24 h-24 object-cover rounded-lg ring-2 ring-white':'w-24 h-24 object-cover rounded-lg mb-3 ring-2 ring-white';
        img.onerror=()=>{img.remove();};
        card.appendChild(img);
        const info=document.createElement('div');
        info.className='space-y-1';
        if(full){
          const name=document.createElement('h4');
          name.className='font-bold';
          name.textContent=s.name;
          info.appendChild(name);
          const id=document.createElement('p');
          id.className='text-sm flex items-center gap-1';
          id.innerHTML='<i class="fa-solid fa-id-badge text-[#14532d]"></i><span>ID: '+(s['id']||'')+'</span>';
          info.appendChild(id);
          const des=document.createElement('p');
          des.className='text-sm flex items-center gap-1';
          des.innerHTML='<i class="fa-solid fa-briefcase text-[#14532d]"></i><span>'+(s['designation']||'')+'</span>';
          info.appendChild(des);
          const dept=document.createElement('p');
          dept.className='text-sm flex items-center gap-1';
          dept.innerHTML=s['department']?'<i class="fa-solid fa-building text-[#14532d]"></i><span>Department: '+s['department']+'</span>':'';
          if(dept.innerHTML) info.appendChild(dept);
          const blood=document.createElement('p');
          blood.className='text-sm flex items-center gap-1';
          blood.innerHTML=s['blood group']?'<i class="fa-solid fa-droplet text-[#14532d]"></i><span>Blood Group: '+s['blood group']+'</span>':'';
          if(blood.innerHTML) info.appendChild(blood);
          const mob=document.createElement('p');
          mob.className='text-sm flex items-center gap-1';
          mob.innerHTML=s['mobile']?'<i class="fa-solid fa-phone text-[#14532d]"></i><span>'+s['mobile']+'</span>':'';
          if(mob.innerHTML) info.appendChild(mob);
        }else{
          const name=document.createElement('h4');
          name.className='font-semibold';
          name.textContent=s.name;
          info.appendChild(name);
          const des=document.createElement('p');
          des.className='text-sm';
          des.textContent=s['designation']||'';
          info.appendChild(des);
          card.addEventListener('click',()=>{window.location.href=root+'pages/staffs.html';});
        }
        card.appendChild(info);
        return card;
      };
      if(staffHome){
        staffHome.innerHTML='';
        const cols=window.matchMedia('(min-width:1024px)').matches?4:(window.matchMedia('(min-width:640px)').matches?3:2);
        const visibleRows=window.matchMedia('(min-width:640px)').matches?1:2;
        const total=cols*(visibleRows+1);
        staffs.slice(0,total).forEach(s=>staffHome.appendChild(createCard(s,false)));
        applyFade(staffHome,visibleRows);
      }
      if(staffWrap){
        staffWrap.innerHTML='';
        staffs.forEach(s=>staffWrap.appendChild(createCard(s,true)));
        const staffSearch=document.getElementById('staffSearchInput');
        if(staffSearch){
          staffSearch.addEventListener('input',()=>{
            const q=staffSearch.value.trim().toLowerCase();
            staffWrap.innerHTML='';
            if(!q){
              staffs.forEach(s=>staffWrap.appendChild(createCard(s,true)));
              return;
            }
            const res=staffs.filter(s=>
              (s.name&&s.name.toLowerCase().includes(q))||
              (s.id&&s.id.toLowerCase().includes(q))||
              (s['designation']&&s['designation'].toLowerCase().includes(q))
            );
            if(res.length===0){
              const p=document.createElement('p');
              p.textContent='No staff found';
              p.className='col-span-full text-center';
              staffWrap.appendChild(p);
            }else{
              res.forEach(s=>staffWrap.appendChild(createCard(s,true)));
            }
          });
        }
      }
    }).catch(()=>{});
  }

  const govWrap=document.getElementById('governingAll');
  if(govWrap){
    fetch(root+'assets/governing/info.txt').then(r=>r.text()).then(t=>{
      const members=t.split(/\n\s*\n/).map(block=>{
        const lines=block.trim().split(/\n/);
        if(!lines[0]) return null;
        const m={name:lines[0].trim()};
        for(let i=1;i<lines.length;i++){
          const [key,...rest]=lines[i].split(':');
          if(!key||rest.length===0) continue;
          m[key.trim().toLowerCase()]=rest.join(':').trim();
        }
        return m.id?m:null;
      }).filter(Boolean);
      govWrap.innerHTML='';
      members.forEach(m=>{
        const card=document.createElement('div');
        card.className='gov-card flex items-center gap-4 bg-white p-4 rounded-lg border-l-4 border-[#7f1d1d] shadow';
        const img=document.createElement('img');
        img.src=root+'assets/governing/pictures/'+m.id+'.jpg';
        img.alt=m.name;
          img.loading='eager';
        img.decoding='async';
        img.className='w-24 h-24 object-cover rounded-full';
        img.onerror=()=>{img.remove();};
        card.appendChild(img);
        const info=document.createElement('div');
        const name=document.createElement('h4');
        name.className='font-bold';
        name.textContent=m.name;
        info.appendChild(name);
        const des=document.createElement('p');
        des.className='text-sm';
        des.textContent=m['designation']||'';
        info.appendChild(des);
        const mob=document.createElement('p');
        mob.className='text-sm';
        mob.textContent=m['mobile']?'Mobile: '+m['mobile']:'';
        if(mob.textContent) info.appendChild(mob);
        card.appendChild(info);
        govWrap.appendChild(card);
      });
    }).catch(()=>{});
  }

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
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,end=parseInt(el.dataset.count,10);
        let start=null;
        const duration=1200;
        const step=t=>{
          if(start===null) start=t;
          const progress=Math.min((t-start)/duration,1);
          el.textContent=Math.floor(progress*end).toLocaleString();
          if(progress<1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    });
  },{threshold:.4});
  counters.forEach(c=>io.observe(c));

  const rates=document.querySelectorAll('#academics .rate[data-count]');
  const rateIO=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target,end=parseInt(el.dataset.count,10);
        let start=null;
        const duration=2500;
        const step=t=>{
          if(start===null) start=t;
          const progress=Math.min((t-start)/duration,1);
          const val=Math.floor(progress*end);
          el.textContent=val;
          if(progress<0.33){
            el.classList.add('text-yellow-500');
            el.classList.remove('text-green-600','text-red-600');
          }else if(progress<0.66){
            el.classList.add('text-green-600');
            el.classList.remove('text-yellow-500','text-red-600');
          }else{
            el.classList.add('text-red-600');
            el.classList.remove('text-yellow-500','text-green-600');
          }
          if(progress<1){
            requestAnimationFrame(step);
          }else{
            el.classList.add('celebrate');
            gsap.fromTo(el,{scale:1.4},{scale:1,duration:.6,ease:'bounce.out'});
            launchConfetti(el);
          }
        };
        requestAnimationFrame(step);
        rateIO.unobserve(el);
      }
    });
  },{threshold:.2});
  rates.forEach(r=>rateIO.observe(r));

    function launchConfetti(el){
      const card=el.closest('.result-card');
      if(!card) return;
      const rect=card.getBoundingClientRect();
      const originX=rect.left+rect.width/2;
      const originY=rect.top+rect.height/2;
      const frag=document.createDocumentFragment();
      const particles=[];
      const count=40;
      for(let i=0;i<count;i++){
        const s=document.createElement('span');
        s.className='particle';
        const size=4+Math.random()*4;
        s.style.width=s.style.height=size+'px';
        s.style.left=originX+'px';
        s.style.top=originY+'px';
        s.style.setProperty('--color',randomColor());
        particles.push(s);
        frag.appendChild(s);
      }
      document.body.appendChild(frag);
      particles.forEach(s=>{
        const angle=Math.random()*Math.PI*2;
        const dist=120+Math.random()*180;
        const dx=Math.cos(angle)*dist;
        const dy=Math.sin(angle)*dist;
        const bend=Math.random()*60-30;
        const path=[
          {x:0,y:0},
          {x:dx/2+bend,y:dy/2-(40+Math.random()*40)},
          {x:dx,y:dy},
          {x:dx+bend*0.5,y:dy+600}
        ];
        gsap.to(s,{motionPath:{path,curviness:1.25},duration:3,ease:'power1.inOut',onComplete:()=>s.remove()});
        gsap.to(s,{rotation:()=>Math.random()*360,repeat:-1,duration:1,ease:'linear'});
      });
    }

  function randomColor(){
    const h=Math.floor(Math.random()*360);
    return `hsl(${h},70%,60%)`;
  }
  document.querySelectorAll('.strip.loop').forEach(strip=>{
    const kids=[...strip.children];
    kids.forEach(el=>strip.appendChild(el.cloneNode(true)));
    let pos=0;
    const speed=parseInt(strip.dataset.speed||'40',10);
    let last=null,paused=false,startX=0,startScroll=0,resumeT;

    const step=t=>{
      if(last===null) last=t;
      const dt=(t-last)/1000;
      last=t;
      if(!paused){
        pos+=speed*dt;
        if(pos>=strip.scrollWidth/2) pos=0;
        strip.scrollLeft=pos;
      } else {
        pos=strip.scrollLeft;
      }
      requestAnimationFrame(step);
    };

    const pause=()=>{paused=true;clearTimeout(resumeT);};
    const resume=()=>{clearTimeout(resumeT);resumeT=setTimeout(()=>{paused=false;},3000);};

    strip.addEventListener('mouseenter',pause);
    strip.addEventListener('mouseleave',()=>{paused=false;});

    strip.addEventListener('touchstart',e=>{pause();startX=e.touches[0].clientX;startScroll=strip.scrollLeft;},{passive:true});
    strip.addEventListener('touchmove',e=>{e.preventDefault();const dx=e.touches[0].clientX-startX;strip.scrollLeft=startScroll-dx;pos=strip.scrollLeft;},{passive:false});
    strip.addEventListener('touchend',resume);
    strip.addEventListener('touchcancel',resume);

    requestAnimationFrame(step);
  });
  gsap.from('#masthead',{y:-60,opacity:0,duration:.6});
  const revealItems=document.querySelectorAll('.section,.card');
  if('IntersectionObserver' in window){
    const io2=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          gsap.to(e.target,{opacity:1,y:0,duration:.6});
          io2.unobserve(e.target);
        }
      });
    },{threshold:.01});
    revealItems.forEach(el=>{gsap.set(el,{opacity:0,y:40});io2.observe(el);});
  }else{
    revealItems.forEach(el=>{gsap.set(el,{opacity:1,y:0});});
  }

  const gr=document.getElementById('galleryRow');
  if(gr){
    const images=[
      'assets/galleries/gallery-1.jpg',
      'assets/galleries/gallery-2.jpg',
      'assets/galleries/gallery-3.jpg',
      'assets/galleries/gallery-4.jpg',
      'assets/galleries/gallery-5.jpg',
      'assets/galleries/gallery-6.jpg',
      'assets/galleries/gallery-7.jpg',
      'assets/galleries/gallery-8.jpg',
      'assets/galleries/gallery-9.jpg',
      'assets/galleries/gallery-10.jpg',
      'assets/galleries/gallery-11.jpg',
      'assets/galleries/gallery-12.jpg'
    ];
    images.forEach(src=>{
      const img=document.createElement('img');
      img.loading='eager';
      img.decoding='async';
      img.alt='Gallery image';
      img.src=src;
      gr.appendChild(img);
    });
    const kids=[...gr.children];
    kids.forEach(el=>gr.appendChild(el.cloneNode(true)));
    const update3d=()=>{
      const center=gr.scrollLeft+gr.clientWidth/2;
      gr.querySelectorAll('img').forEach(img=>{
        const ic=img.offsetLeft+img.clientWidth/2;
        const offset=(ic-center)/gr.clientWidth;
        const angle=offset*40;
        const scale=1-Math.min(Math.abs(offset),0.5)*0.5;
        img.style.transform=`rotateY(${angle}deg) scale(${scale})`;
        img.style.zIndex=Math.round((1-Math.abs(offset))*100);
      });
    };
    update3d();
    const imgModal=document.getElementById('imgModal');
    const modalImg=document.getElementById('imgModalImg');
    const imgClose=document.getElementById('imgClose');
    const imgSave=document.getElementById('imgSave');
    const closeImg=()=>{
      if(imgModal){
        imgModal.classList.remove('open');
        document.body.style.overflow='';
        document.documentElement.style.overflow='';
      }
    };
    if(imgModal && modalImg && imgSave){
      gr.addEventListener('click',e=>{
        const target=e.target;
        if(target.tagName==='IMG'){
          modalImg.src=target.src;
          imgSave.href=target.src;
          imgModal.classList.add('open');
          document.body.style.overflow='hidden';
          document.documentElement.style.overflow='hidden';
        }
      });
      imgModal.addEventListener('click',e=>{if(e.target===imgModal) closeImg();});
      if(imgClose) imgClose.addEventListener('click',closeImg);
    }
    let pos=0;
    const speed=parseInt(gr.dataset.speed||'20',10);
    let last=null,paused=false,startX=0,startScroll=0,resumeT,velocity=0,lastX=0,isDragging=false;

    const step=t=>{
      if(last===null) last=t;
      const dt=(t-last)/1000;
      last=t;
      if(!paused){
        pos+=speed*dt;
        if(pos>=gr.scrollWidth/2) pos=0;
      } else if(Math.abs(velocity)>0.1){
        pos+=velocity;
        if(pos<0) pos+=gr.scrollWidth/2;
        else if(pos>=gr.scrollWidth/2) pos-=gr.scrollWidth/2;
        velocity*=0.92;
      } else {
        velocity=0;
        pos=gr.scrollLeft;
      }
      gr.scrollLeft=pos;
      update3d();
      requestAnimationFrame(step);
    };

    const pause=()=>{paused=true;clearTimeout(resumeT);};
    const resume=()=>{clearTimeout(resumeT);resumeT=setTimeout(()=>{paused=false;},3000);};

    gr.addEventListener('mouseenter',pause);
    gr.addEventListener('mouseleave',()=>{paused=false;});

    gr.addEventListener('touchstart',e=>{pause();startX=e.touches[0].clientX;lastX=startX;startScroll=gr.scrollLeft;velocity=0;},{passive:true});
    gr.addEventListener('touchmove',e=>{e.preventDefault();const x=e.touches[0].clientX;const dx=x-lastX;gr.scrollLeft-=dx;pos=gr.scrollLeft;velocity=-dx;lastX=x;},{passive:false});
    gr.addEventListener('touchend',resume);
    gr.addEventListener('touchcancel',resume);

    gr.addEventListener('mousedown',e=>{pause();isDragging=true;startX=e.clientX;lastX=startX;startScroll=gr.scrollLeft;velocity=0;});
    gr.addEventListener('mousemove',e=>{if(!isDragging) return;e.preventDefault();const x=e.clientX;const dx=x-lastX;gr.scrollLeft-=dx;pos=gr.scrollLeft;velocity=-dx;lastX=x;});
    ['mouseup','mouseleave'].forEach(ev=>gr.addEventListener(ev,()=>{if(isDragging){isDragging=false;resume();}}));

    gr.addEventListener('wheel',e=>{pause();e.preventDefault();velocity+=e.deltaY*.3;resume();},{passive:false});

    requestAnimationFrame(step);
  }

  const spaceSection=document.getElementById('space');
  if(spaceSection){
    const spaceIO=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          document.body.classList.add('space-mode');
        }else{
          document.body.classList.remove('space-mode');
        }
      });
    },{threshold:0.01});
    spaceIO.observe(spaceSection);
  }
}
