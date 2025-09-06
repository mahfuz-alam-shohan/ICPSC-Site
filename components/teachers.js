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
  card.className='relative bg-gradient-to-br from-white via-yellow-50 to-green-50 border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center text-center overflow-hidden';
  const art=document.createElement('div');
  art.className='absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#ffd166] opacity-20 -z-10 pointer-events-none';
  const art2=document.createElement('div');
  art2.className='absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#06d6a0] opacity-20 -z-10 pointer-events-none';
  card.appendChild(art);
  card.appendChild(art2);
  const img=document.createElement('img');
  img.loading='lazy';
  img.src=root+'assets/teachers/pictures/'+t.id+'.jpg';
  img.alt=t.name;
  img.className='w-32 h-32 object-cover rounded-full mb-3 cursor-pointer';
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
