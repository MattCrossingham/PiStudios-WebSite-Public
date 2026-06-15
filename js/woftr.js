/* ============================================================
   WOFTR — shared helpers (sound, voice, typing, nav)
   Every page includes this so behaviour + voice stay identical.
   ============================================================ */

// ── AUDIO ─────────────────────────────────────────────────────
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
    flt.type='lowpass';flt.frequency.value=350;gain.gain.value=0.005;
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

// unlock audio + hide sound note on first interaction
document.addEventListener('keydown',()=>{
  startHum();
  const n=document.getElementById('sound-note');
  if(n) n.style.display='none';
},{once:true});
document.addEventListener('click',()=>{ startHum(); },{once:true});

// attach key click to any text inputs present
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('input[type="text"]').forEach(i=>{
    i.addEventListener('keydown',playKeyClick);
    i.addEventListener('input',()=>autoSize(i));
    autoSize(i);
  });
});

// ── AUTO-SIZE MONOSPACE INPUTS ────────────────────────────────
function autoSize(input){
  input.style.width=Math.max(1,input.value.length+1)+'ch';
}

// ── WOPR VOICE ────────────────────────────────────────────────
// NOTE: tuned later. Flat, monotone, clipped, cold + machine-like.
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
    window.speechSynthesis.cancel();
    const words=text.toLowerCase().replace(/[—]/g,' ').split(/\s+/).filter(Boolean);
    for(const word of words){
      const u=new SpeechSynthesisUtterance(word);
      if(woprVoice) u.voice=woprVoice;
      u.rate=1.05; u.pitch=0.3; u.volume=0.9;
      window.speechSynthesis.speak(u);
    }
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

// type a sequence of lines into a container element
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

// ── BACK TO MENU (Esc / M) ────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ window.location.href='index.html'; }
});

// typewriter — types text char by char into a NEW line appended to the terminal/container
// Useful for dramatic reveal lines. Returns a promise.
async function typewriter(text, cls='', speed=45, delay=0) {
  await sleep(delay);
  const d = document.createElement('div');
  d.className = 'line ' + cls;
  // append to the log element if present, else body
  const container = document.getElementById('log') || document.querySelector('.console') || document.body;
  container.appendChild(d);
  for (const ch of text) {
    await sleep(speed);
    d.textContent += ch;
    container.scrollTop = container.scrollHeight;
  }
  return d;
}
