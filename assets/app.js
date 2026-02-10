
const CONFIG = {
  WIFE_NAME: "Shivani",
  MUSIC: "assets/song.mp3",                     // set to "assets/song.mp3" to enable
  BG_MODE: "hearts",              // stars | hearts | both

  ILLUSTRATION: "assets/images/F3DBCF13-4FBC-4DFC-BE8F-F0A7B903184B.PNG",
  LANDING_GIF: "assets/images/happy_birthday.gif",

  HEARTFELT: `My Love, Shivani ❤️
On this beautiful day that brought you into the world, my heart feels overwhelmed with gratitude.  The universe became softer 🌤️, the light warmer ✨, and life more meaningful the day you arrived. 

Tonight, as candles glow 🕯️ and the world falls into a quiet hush 🌙, I want you to feel every ounce of the love I carry for you… a love that grows deeper with every shared moment 💞, every smile 😊, every day we walk through together.

Shivani, you are the calm after every storm 🌈, the warmth in all my winters ❄️❤️, the smile that colors my days with hope 🌼. You are the soul I lean toward without even thinking — the blessing I thank life for every single day 🙏.

May this birthday wrap you in the same warmth, joy, and quiet magic ✨ you bring into my world so effortlessly.

Here’s to you, Shivani — to your grace 🌹, your laughter 💐, your dreams 🌟, and to the beautiful journey we’re building hand in hand 🤝.

Happy Birthday, my heart… today, tomorrow, and always.🎂❤️✨`,

  PHOTOS: [
    { file: "assets/images/524e902ec5198f3578fab7be0f986e5a.png", note: "Temple trip, timeless smile." },
    { file: "assets/images/a6cdaa9413bc9405d119ef0f9fd6596f.png", note: "A garden day to remember." },
    { file: "assets/images/09e76c40a48420df2de83ea83e5210dc.png", note: "Green looks gorgeous on you." },
    { file: "assets/images/dt0ng8z7mnrmw0cw7k6bbv2278_result_0.png", note: "Classy and graceful." },
    { file: "assets/images/IMG_4830.PNG", note: "Peaceful morning at the park." }
  ],

  REVEAL_TEXT: "Tonight🌙, beneath the quiet glow of candlelight🕯️, a whisper of a gift 🎁 will find its way to you💞.”",
  GIF: "assets/images/giphy.gif"
};

/* -------- Backgrounds -------- */
function heartsBackground(){ const layer=document.querySelector('.hearts'); if(!layer) return; function spawn(){ const h=document.createElement('div'); h.className='heart'; const left=Math.random()*100; const dur=10+Math.random()*8; const size=12+Math.random()*20; h.style.left=left+'vw'; h.style.width=size+'px'; h.style.height=size+'px'; h.style.animationDuration=dur+'s'; layer.appendChild(h); setTimeout(()=>h.remove(),dur*1000);} for(let i=0;i<24;i++) setTimeout(spawn,Math.random()*1200); setInterval(spawn,600); }
const Starfield=(function(){ let cv,ctx,DPR=1,stars=[],tick=0; function mount(){ cv=document.createElement('canvas'); cv.className='bgfx'; document.body.appendChild(cv); ctx=cv.getContext('2d'); DPR=Math.max(1,devicePixelRatio||1); resize(); init(); draw(); addEventListener('resize',resize,{passive:true}); }
  function resize(){ cv.width=innerWidth*DPR; cv.height=innerHeight*DPR; cv.style.width=innerWidth+'px'; cv.style.height=innerHeight+'px'; init(true);} 
  function init(recalc=false){ const count=Math.floor((innerWidth*innerHeight)/7500); if(!recalc) stars=[]; for(let i=0;i<count;i++){ stars[i]=stars[i]||{}; stars[i].x=Math.random()*cv.width; stars[i].y=Math.random()*cv.height; stars[i].z=0.2+Math.random()*1.3; stars[i].tw=Math.random()*1000; } }
  function draw(){ ctx.clearRect(0,0,cv.width,cv.height); for(const s of stars){ const a=0.6+0.4*Math.sin((tick+s.tw)/120); ctx.fillStyle=`rgba(255,255,220,${a})`; const r=(s.z)*1.1; ctx.beginPath(); ctx.arc(s.x,s.y,r,0,Math.PI*2); ctx.fill(); s.x+=0.04*s.z; s.y+=0.01*s.z; if(s.x>cv.width) s.x=0; if(s.y>cv.height) s.y=0; } tick++; requestAnimationFrame(draw);} return {mount}; })();
function mountBackgrounds(){ if(CONFIG.BG_MODE==='hearts') heartsBackground(); else if(CONFIG.BG_MODE==='stars') Starfield.mount(); else { Starfield.mount(); heartsBackground(); } }

/* -------- Confetti -------- */
const Confetti=(function(){ let cv,ctx,DPR=Math.max(1,devicePixelRatio||1),parts=[]; function mount(){ cv=document.createElement('canvas'); cv.className='fx'; document.body.appendChild(cv); ctx=cv.getContext('2d'); resize(); draw(); addEventListener('resize',resize,{passive:true}); }
  function resize(){ cv.width=innerWidth*DPR; cv.height=innerHeight*DPR; cv.style.width=innerWidth+'px'; cv.style.height=innerHeight+'px'; }
  function launch(ms=1500){ const end=performance.now()+ms; (function spawn(){ for(let i=0;i<20;i++){ parts.push({x:Math.random()*cv.width,y:-10,w:6+Math.random()*7,h:8+Math.random()*12,vx:(-2+Math.random()*4)*DPR,vy:(3+Math.random()*3)*DPR,rot:Math.random()*Math.PI,vr:(-0.12+Math.random()*0.24),color:['#F9D342','#FFE08C','#6E8B3D','#7DD3FC','#FCA5A5','#B794F4','#BEF264'][Math.floor(Math.random()*7)],life:0}); } if(performance.now()<end) setTimeout(spawn,120); })(); }
  function draw(){ if(!ctx) return; ctx.clearRect(0,0,cv.width,cv.height); for(let i=parts.length-1;i>=0;i--){ const p=parts[i]; p.life++; p.x+=p.vx; p.y+=p.vy; p.vy+=0.06*DPR; p.rot+=p.vr; p.vx*=0.995; p.vy*=0.996; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); if(p.y>cv.height+50*DPR || p.life>900) parts.splice(i,1);} requestAnimationFrame(draw);} return {mount,launch}; })();

/* -------- Music (optional) -------- */
function setupMusic(){ const btn=document.getElementById('musicToggle'); if(!btn||!CONFIG.MUSIC){ if(btn) btn.style.display='none'; return; } const audio=new Audio(CONFIG.MUSIC); audio.preload='auto'; let on=false; btn.addEventListener('click', async ()=>{ try{ if(!on){ await audio.play(); on=true; btn.textContent='⏸ Pause'; } else { audio.pause(); on=false; btn.textContent='🎵 Play'; } }catch(e){ alert('Tap page once, then press Play (autoplay policy).'); } }); }

/* -------- SPA controller -------- */
const Steps = {
  cur: 0, initFlags: {},
  all(){ return Array.from(document.querySelectorAll('.step')); },
  show(i){ const steps=this.all(); if(i<0||i>=steps.length) return; steps.forEach((s,idx)=>{ const on = idx===i; s.classList.toggle('active', on); s.hidden = !on; }); this.cur=i; this.updateDots(); this.initStep(i); },
  next(){ this.show(this.cur+1); }, prev(){ this.show(this.cur-1); },
  updateDots(){ const dots=document.querySelectorAll('.dot'); dots.forEach((d,idx)=> d.classList.toggle('on', idx===this.cur)); }
};

function setBrand(){ document.getElementById('brandName')?.replaceChildren(document.createTextNode(`For ${CONFIG.WIFE_NAME}`)); document.querySelectorAll('[data-her]').forEach(el=> el.textContent=CONFIG.WIFE_NAME); }

function initLanding(){ setBrand(); const ill=document.getElementById('illustration'); const gif=document.getElementById('landingGif'); if(ill) ill.src=CONFIG.ILLUSTRATION; if(gif) gif.src=CONFIG.LANDING_GIF; document.getElementById('startBtn')?.addEventListener('click',()=> Confetti.launch(1200)); }
function initCake(){ setBrand(); const blowBtn=document.getElementById('blow'); const cutBtn=document.getElementById('cut'); const flames=document.querySelectorAll('.flame'); const knife=document.querySelector('.knife'); const slice=document.querySelector('.slice'); function extinguish(){ flames.forEach(f=> f.classList.add('off')); Confetti.launch(1200); blowBtn.setAttribute('disabled',''); cutBtn.removeAttribute('disabled'); } blowBtn?.addEventListener('click',extinguish); cutBtn?.addEventListener('click',()=>{ knife.classList.add('show'); slice.classList.add('show'); Confetti.launch(1500); cutBtn.setAttribute('disabled',''); }); }
function initMessage(){ setBrand(); const el=document.getElementById('msg'); typewriter(el, CONFIG.HEARTFELT, 16); }

/*
function initPhotos(){ setBrand(); const track=document.getElementById('track'); const prev=document.getElementById('prev'); const next=document.getElementById('next'); (CONFIG.PHOTOS||[]).forEach(p=>{ const fig=document.createElement('figure'); fig.className='slide'; fig.innerHTML=`<img alt="photo" src="${p.file}"/><figcaption class="cap">${p.note||''}</figcaption>`; track.appendChild(fig); }); function slideBy(d){ const slide=track.querySelector('.slide'); const delta=slide? slide.clientWidth+12: track.clientWidth*0.8; track.scrollBy({left:d*delta,behavior:'smooth'}); } prev?.addEventListener('click',()=>slideBy(-1)); next?.addEventListener('click',()=>slideBy(1)); }
*/
function initPhotos(){
  setBrand();

  const track = document.getElementById('track');
  const prev  = document.getElementById('prev');
  const next  = document.getElementById('next');

  // Build slides
  (CONFIG.PHOTOS || []).forEach(p => {
    const fig = document.createElement('figure');
    fig.className = 'slide';
    const img = document.createElement('img');
    img.alt = 'photo';
    img.loading = 'lazy';
    img.src = p.file;

    // When the image loads, adapt layout if portrait
    img.addEventListener('load', () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio < 0.9) {           // clearly portrait
        fig.classList.add('portrait');
      }
    });

    const cap = document.createElement('figcaption');
    cap.className = 'cap';
    cap.textContent = p.note || '';

    // Fit/Fill toggle
    const toggle = document.createElement('button');
    toggle.className = 'fit-toggle';
    toggle.textContent = 'Fit';
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      // toggle object-fit between contain and cover
      const isContain = img.style.objectFit === 'contain' || fig.classList.contains('portrait');
      if (isContain) {
        img.style.objectFit = 'cover';
        fig.classList.remove('portrait');
        toggle.textContent = 'Fit';
      } else {
        img.style.objectFit = 'contain';
        fig.classList.add('portrait');
        toggle.textContent = 'Fill';
      }
    });

    fig.appendChild(img);
    fig.appendChild(cap);
    fig.appendChild(toggle);
    track.appendChild(fig);
  });

  // Arrow scrolling
  function slideBy(d){
    const slide = track.querySelector('.slide');
    const delta = slide ? slide.clientWidth + 12 : track.clientWidth * 0.8;
    track.scrollBy({ left: d * delta, behavior: 'smooth' });
  }
  prev?.addEventListener('click', () => slideBy(-1));
  next?.addEventListener('click', () => slideBy(1));
}


function initGift(){ setBrand(); const gift=document.getElementById('giftBox'); const btn=document.getElementById('openGift'); const txt=document.getElementById('giftText'); const gif=document.getElementById('giftGif'); gif.src=CONFIG.GIF; function open(){ if(gift.classList.contains('open')) return; gift.classList.add('open'); Confetti.launch(2500); txt.textContent=CONFIG.REVEAL_TEXT; } btn?.addEventListener('click',open); gift?.addEventListener('click',open); }

function typewriter(el,text,speed=18){ el.textContent=''; let i=0; (function tick(){ el.textContent += text.charAt(i++); if(i<text.length) requestAnimationFrame(()=>setTimeout(tick,speed)); })(); }

function bindNav(){ document.querySelectorAll('[data-next]')?.forEach(b=> b.addEventListener('click', ()=> Steps.next())); document.querySelectorAll('[data-prev]')?.forEach(b=> b.addEventListener('click', ()=> Steps.prev())); }

Steps.initStep = function(i){ if(this.initFlags[i]) return; const f=[initLanding, initCake, initMessage, initPhotos, initGift][i]; if(typeof f==='function') f(); this.initFlags[i]=true; };

window.addEventListener('DOMContentLoaded', ()=>{ mountBackgrounds(); Confetti.mount(); setupMusic(); bindNav(); // build dots
  const dots=document.querySelector('.progress'); for(let i=0;i<5;i++){ const d=document.createElement('div'); d.className='dot'; dots.appendChild(d); }
  Steps.show(0);
});
