/* ============================================================
   WOFTR — shared helpers (sound, voice, typing, nav)
   ============================================================ */

// ── AUDIO (no modem / no mp3) ─────────────────────────────────
let _audioCtx;
function getCtx(){
  if(!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function playKeyClick(){
  try{
    const ctx=getCtx(),osc=ctx.createOscillator(),gain=ctx.createGain(),flt=ctx.createBiquadFilter();
    osc.type='sawtooth'; osc.frequency.value=160+Math.random()*140;
    flt.type='lowpass'; flt.frequency.value=1100; gain.gain.value=0.08;
    const d=0.03+Math.random()*0.02;
    osc.connect(flt);flt.connect(gain);gain.connect(ctx.destination);
    osc.start();osc.stop(ctx.currentTime+d);
    gain.gain.linearRampToValueAtTime(0.001,ctx.currentTime+d);
  }catch(e){}
}

function startHum(){
  try{
    const ctx=getCtx(),osc=ctx.createOscillator(),gain=ctx.createGain(),flt=ctx.createBiquadFilter();
    osc.type='sine';osc.frequency.value=78;
    flt.type='lowpass';flt.frequency.value=350;gain.gain.value=0.004;
    osc.connect(flt);flt.connect(gain);gain.connect(ctx.destination);osc.start();
  }catch(e){}
}

function playBeep(freq=440,dur=0.08,vol=0.06){
  try{
    const ctx=getCtx(),osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='square';osc.frequency.value=freq;gain.gain.value=vol;
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start();osc.stop(ctx.currentTime+dur);
    gain.gain.linearRampToValueAtTime(0.001,ctx.currentTime+dur);
  }catch(e){}
}

document.addEventListener('keydown',()=>{
  startHum();
  const n=document.getElementById('sound-note');
  if(n) n.style.display='none';
},{once:true});
document.addEventListener('click',()=>{ startHum(); },{once:true});

window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('input[type="text"]').forEach(i=>{
    i.addEventListener('keydown',playKeyClick);
    i.addEventListener('input',()=>autoSize(i));
    autoSize(i);
  });
});

function autoSize(input){
  if(!input) return;
  input.style.width=Math.max(1,input.value.length+1)+'ch';
}

// ── WOPR VOICE ────────────────────────────────────────────────
let woprVoice=null;
function pickVoice(){
  const voices=window.speechSynthesis.getVoices();
  if(!voices.length) return;
  const prefer=['Microsoft David','Google UK English Male','Daniel','Microsoft Mark','Fred','Google US English','Albert'];
  for(const name of prefer){
    const v=voices.find(x=>x.name.includes(name));
    if(v){woprVoice=v;return;}
  }
  woprVoice=voices.find(v=>/en[-_]/i.test(v.lang))||voices[0];
}
if('speechSynthesis' in window){
  pickVoice();
  window.speechSynthesis.onvoiceschanged=pickVoice;
}

function speak(text){
  try{
    if(!('speechSynthesis' in window)) return;
    if(!woprVoice) pickVoice();
    window.speechSynthesis.cancel();
    const clean=String(text).replace(/[—–]/g,' ').trim();
    if(!clean) return;
    const u=new SpeechSynthesisUtterance(clean);
    if(woprVoice) u.voice=woprVoice;
    u.rate=0.9; u.pitch=0.3; u.volume=0.9;
    window.speechSynthesis.speak(u);
  }catch(e){}
}

// ── UTILS ─────────────────────────────────────────────────────
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

function typeText(el,text,speed=45){
  el.textContent='';let i=0;
  return new Promise(resolve=>{
    const iv=setInterval(()=>{
      if(i<text.length){el.textContent+=text[i++];}
      else{clearInterval(iv);resolve();}
    },speed);
  });
}

function respond(el,text){
  if(!el) return;
  typeText(el,text,42);
  speak(text);
}

async function typeLines(container, lines, opts={}){
  const {lineDelay=140, speak:doSpeak=false}=opts;
  for(const ln of lines){
    const div=document.createElement('div');
    div.className='line '+(ln.cls||'');
    container.appendChild(div);
    await typeText(div, ln.text!==undefined?ln.text:ln, ln.speed||30);
    if(doSpeak && (ln.text!==undefined?ln.text:ln).trim()) speak(ln.text!==undefined?ln.text:ln);
    await sleep(lineDelay);
  }
}

async function typewriter(text, cls='', speed=45, delay=0) {
  await sleep(delay);
  const d = document.createElement('div');
  d.className = 'line ' + cls;
  const container = document.getElementById('log') || document.querySelector('.console') || document.body;
  container.appendChild(d);
  for (const ch of text) {
    await sleep(speed);
    d.textContent += ch;
    container.scrollTop = container.scrollHeight;
  }
  return d;
}

async function revealItems(container,items,isPlain=false){
  container.innerHTML='';
  for(const item of items){
    const d=document.createElement('div');
    const label=isPlain?item:item.label;
    const accent=!isPlain&&item.accent;
    d.className='menu-item line clickable'+(accent?' accent bold':'');
    d.textContent=label;
    d.setAttribute('role','button');
    d.tabIndex=0;
    container.appendChild(d);
    await sleep(90);
    d.classList.add('visible');
  }
}

function wireMenuClicks(containerId, onPick){
  const el=document.getElementById(containerId);
  if(!el) return;
  el.addEventListener('click',e=>{
    if(!e.target.classList.contains('menu-item'))return;
    onPick(e.target.textContent.toUpperCase());
  });
  el.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    if(!e.target.classList.contains('menu-item'))return;
    e.preventDefault();
    onPick(e.target.textContent.toUpperCase());
  });
}

// Escape → main menu (skip if already on index and no data-stay)
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape') return;
  const path=(location.pathname||'').split('/').pop()||'index.html';
  if(path==='index.html'||path===''||path==='/') return;
  window.location.href = path.includes('/') ? '../index.html' : 'index.html';
});
