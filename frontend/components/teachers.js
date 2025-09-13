document.addEventListener('DOMContentLoaded',()=>{
  const root = window.location.pathname.includes('/pages/') ? '../' : '';
  fetch(root + 'assets/teachers/info.txt')
    .then(r=>r.text())
    .then(t=>{
      const teachers=parseTeachers(t);
      renderHome(teachers,root);
      renderTeachersPage(teachers,root);
      setupTeacherSearch(teachers,root);
    }).catch(()=>{});
});

function parseTeachers(text){
  return text.split(/\n\s*\n/).map(block=>{
    const lines=block.trim().split(/\n/);
    if(!lines[0]) return null;
    const teacher={name:lines[0].trim()};
    for(let i=1;i<lines.length;i++){
      const [key,...rest]=lines[i].split(':');
      if(!key||rest.length===0) continue;
      teacher[key.trim().toLowerCase()]=rest.join(':').trim();
    }
    return teacher.id?teacher:null;
  }).filter(Boolean);
}

function createCard(t,root,full){
  const card=document.createElement('article');
  card.className='teacher-card relative border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center text-center overflow-hidden bg-white/80 backdrop-blur-sm';
  const deco1=document.createElement('span');
  deco1.className='absolute -top-10 -left-10 w-24 h-24 rounded-full pointer-events-none';
  deco1.style.zIndex='-1';
  deco1.style.background='var(--brand-green)';
  deco1.style.opacity='0.15';
  card.appendChild(deco1);

  const deco2=document.createElement('span');
  deco2.className='absolute -bottom-12 -right-12 w-32 h-32 rounded-full pointer-events-none';
  deco2.style.zIndex='-1';
  deco2.style.background='var(--brand-red)';
  deco2.style.opacity='0.15';
  card.appendChild(deco2);

  const deco3=document.createElement('span');
  deco3.className='absolute -top-6 -right-8 w-16 h-16 rounded-full pointer-events-none';
  deco3.style.zIndex='-1';
  deco3.style.background='#ffd166';
  deco3.style.opacity='0.2';
  card.appendChild(deco3);

  const deco4=document.createElement('span');
  deco4.className='absolute -bottom-8 -left-6 w-20 h-20 rounded-full pointer-events-none';
  deco4.style.zIndex='-1';
  deco4.style.background='var(--brand-green)';
  deco4.style.opacity='0.1';
  card.appendChild(deco4);
  const img=document.createElement('img');
  img.src=root+'assets/teachers/pictures/'+t.id+'.jpg';
  img.alt=t.name;
  img.loading='eager';
  img.decoding='async';
  img.className='w-32 h-32 object-cover rounded-full mb-3 cursor-pointer ring-4 ring-white';
  img.style.boxShadow='0 0 0 4px #fff,0 0 20px rgba(20,83,45,0.45)';
  img.onerror=()=>{img.remove();};
  card.appendChild(img);
  const name=document.createElement('h4');
  name.className='font-bold';
  name.textContent=t.name;
  card.appendChild(name);
  if(full){
    const des=document.createElement('p');
    des.className='text-sm flex items-center gap-1';
    des.innerHTML='<i class="fa-solid fa-briefcase text-[#14532d]"></i><span>'+(t['designation']||'')+'</span>';
    card.appendChild(des);
    const id=document.createElement('p');
    id.className='text-sm flex items-center gap-1';
    id.innerHTML='<i class="fa-solid fa-id-badge text-[#14532d]"></i><span>ID: '+(t['id']||'')+'</span>';
    card.appendChild(id);
    const subj=document.createElement('p');
    subj.className='text-sm flex items-center gap-1';
    subj.innerHTML=t['subject']?'<i class="fa-solid fa-book-open text-[#14532d]"></i><span>Subject: '+t['subject']+'</span>':'';
    if(subj.innerHTML) card.appendChild(subj);
    const blood=document.createElement('p');
    blood.className='text-sm flex items-center gap-1';
    blood.innerHTML=t['blood group']?'<i class="fa-solid fa-droplet text-[#14532d]"></i><span>Blood Group: '+t['blood group']+'</span>':'';
    if(blood.innerHTML) card.appendChild(blood);
    const mob=document.createElement('p');
    mob.className='text-sm flex items-center gap-1';
    mob.innerHTML=t['mobile']?'<i class="fa-solid fa-phone text-[#14532d]"></i><span>'+t['mobile']+'</span>':'';
    if(mob.innerHTML) card.appendChild(mob);
  }else{
    const des=document.createElement('p');
    des.className='text-sm';
    des.textContent=t['designation']||'';
    card.appendChild(des);
    img.addEventListener('click',()=>{window.location.href=root+'pages/teachers.html';});
  }
  return card;
}

function applyFade(wrap,rows){
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
}

function renderHome(teachers,root){
  const wrap=document.getElementById('teachersHome');
  if(!wrap) return;
  const cols=window.matchMedia('(min-width:1024px)').matches?4:(window.matchMedia('(min-width:640px)').matches?3:2);
  const visibleRows=2;
  const total=cols*(visibleRows+1);
  teachers.slice(0,total).forEach(t=>wrap.appendChild(createCard(t,root,false)));
  applyFade(wrap,visibleRows);
}

function renderTeachersPage(teachers,root){
  const wrap=document.getElementById('teachersAll');
  if(!wrap) return;
  wrap.innerHTML='';
  teachers.forEach(t=>wrap.appendChild(createCard(t,root,true)));
}

function setupTeacherSearch(teachers,root){
  const input=document.getElementById('teacherSearchInput');
  const wrap=document.getElementById('teachersAll');
  if(!input||!wrap) return;
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    wrap.innerHTML='';
    if(!q){
      renderTeachersPage(teachers,root);
      return;
    }
    const res=teachers.filter(t=>
      (t.name&&t.name.toLowerCase().includes(q))||
      (t.subject&&t.subject.toLowerCase().includes(q))||
      (t.id&&t.id.toLowerCase().includes(q))
    );
    if(res.length===0){
      const p=document.createElement('p');
      p.textContent='No teachers found';
      p.className='col-span-full text-center';
      wrap.appendChild(p);
    }else{
      res.forEach(t=>wrap.appendChild(createCard(t,root,true)));
    }
  });
}
