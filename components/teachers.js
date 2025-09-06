document.addEventListener('DOMContentLoaded',()=>{
  const root = window.location.pathname.includes('/pages/') ? '../' : '';
  fetch(root + 'assets/teachers/info.txt')
    .then(r=>r.text())
    .then(t=>{
      const teachers=parseTeachers(t);
      renderHome(teachers,root);
      renderTeachersPage(teachers,root);
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
  deco1.className='absolute -top-10 -left-10 w-24 h-24 rounded-full bg-green-200 opacity-40 pointer-events-none';
  deco1.style.zIndex='-1';
  card.appendChild(deco1);

  const deco2=document.createElement('span');
  deco2.className='absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-red-200 opacity-40 pointer-events-none';
  deco2.style.zIndex='-1';
  card.appendChild(deco2);

  const ring=document.createElement('span');
  ring.className='absolute top-1/2 left-1/2 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none';
  ring.style.border='4px solid rgba(20,83,45,0.25)';
  ring.style.boxShadow='0 0 0 8px rgba(127,29,29,0.15)';
  ring.style.zIndex='-1';
  card.appendChild(ring);
  const img=document.createElement('img');
  img.loading='lazy';
  img.src=root+'assets/teachers/pictures/'+t.id+'.jpg';
  img.alt=t.name;
  img.className='w-32 h-32 object-cover rounded-full mb-3 cursor-pointer ring-4 ring-white';
  img.style.boxShadow='0 0 0 4px #fff,0 0 20px rgba(20,83,45,0.45)';
  img.onerror=()=>{img.remove();};
  card.appendChild(img);
  const name=document.createElement('h4');
  name.className='font-bold';
  name.textContent=t.name;
  card.appendChild(name);
  const des=document.createElement('p');
  des.className='text-sm';
  des.textContent=t['designation']||'';
  card.appendChild(des);
  if(full){
    const id=document.createElement('p');
    id.className='text-sm';
    id.textContent='ID: '+(t['id']||'');
    card.appendChild(id);
    const subj=document.createElement('p');
    subj.className='text-sm';
    subj.textContent='Subject: '+(t['subject']||'');
    card.appendChild(subj);
    const blood=document.createElement('p');
    blood.className='text-sm';
    blood.textContent='Blood Group: '+(t['blood group']||'');
    card.appendChild(blood);
    const mob=document.createElement('p');
    mob.className='text-sm';
    mob.textContent='Mobile: '+(t['mobile']||'');
    card.appendChild(mob);
  }else{
    img.addEventListener('click',()=>{window.location.href=root+'pages/teachers.html';});
  }
  return card;
}

function renderHome(teachers,root){
  const wrap=document.getElementById('teachersHome');
  if(!wrap) return;
  const max=window.matchMedia('(min-width:1024px)').matches?8:6;
  teachers.slice(0,max).forEach(t=>wrap.appendChild(createCard(t,root,false)));
}

function renderTeachersPage(teachers,root){
  const wrap=document.getElementById('teachersAll');
  if(!wrap) return;
  const perPage=24;
  const params=new URLSearchParams(window.location.search);
  let page=parseInt(params.get('page')||'1',10);if(isNaN(page)||page<1) page=1;
  const totalPages=Math.max(1,Math.ceil(teachers.length/perPage));
  if(page>totalPages) page=totalPages;
  const start=(page-1)*perPage;
  teachers.slice(start,start+perPage).forEach(t=>wrap.appendChild(createCard(t,root,true)));
  const pag=document.getElementById('teacherPagination');
  if(pag){
    for(let i=1;i<=totalPages;i++){
      const a=document.createElement('a');
      a.textContent=i;
      a.href='teachers.html?page='+i;
      a.className='px-3 py-1 border rounded '+(i===page?'bg-gray-200 pointer-events-none':'bg-white');
      pag.appendChild(a);
    }
  }
}
