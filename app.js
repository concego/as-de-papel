const board = document.querySelector('#board');
const boardLayer = document.querySelector('#boardLayer');
const pathLayer = document.querySelector('#pathLayer');
const objectLayer = document.querySelector('#objectLayer');
const planeLayer = document.querySelector('#planeLayer');
const cameraFocus = document.querySelector('#cameraFocus');
const stats = document.querySelector('#stats');
const logList = document.querySelector('#actionLog');
const launchButton = document.querySelector('#launchButton');
const intensityPanel = document.querySelector('#intensityPanel');
const intensityChoices = document.querySelector('#intensityChoices');
const intensityHint = document.querySelector('#intensityHint');
const meterFill = document.querySelector('#intensityMeterFill');
const radarOutput = document.querySelector('#radarOutput');
const musicButton = document.querySelector('#musicButton');
const audioStatus = document.querySelector('#audioStatus');
const directionText = document.querySelector('#directionText');
const flightPreview = document.querySelector('#flightPreview');
const cameraStatus = document.querySelector('#cameraStatus');
const music = document.querySelector('#phaseMusic');
music.volume = 0.16;
music.addEventListener('play', () => { musicButton.textContent='❚❚ Pausar música'; audioStatus.textContent='Música tocando · indicadores discretos disponíveis.'; });
music.addEventListener('pause', () => { musicButton.textContent='▶ Tocar música'; audioStatus.textContent='Música parada · indicadores discretos disponíveis.'; });
music.addEventListener('error', () => { audioStatus.textContent='A faixa não pôde ser carregada. Use o player novamente após recarregar a página.'; });
let audioContext = null; let audioBus = null;

const W = 12, H = 10, CELL_W = 58, CELL_H = 42, ORIGIN_X = 105, ORIGIN_Y = 74, Z_STEP = 13;
const intensities = [
  { key: 'weak', name: 'Fraco', distance: 2, height: 2, color: '#7c9fbc' },
  { key: 'medium', name: 'Médio', distance: 3, height: 3, color: '#d09a36' },
  { key: 'strong', name: 'Forte', distance: 5, height: 5, color: '#b95e3d' }
];
const directions = [
  { name: 'leste', dx: 1, dy: 0 }, { name: 'sudeste', dx: 1, dy: 1 },
  { name: 'sul', dx: 0, dy: 1 }, { name: 'sudoeste', dx: -1, dy: 1 },
  { name: 'oeste', dx: -1, dy: 0 }, { name: 'noroeste', dx: -1, dy: -1 },
  { name: 'norte', dx: 0, dy: -1 }, { name: 'nordeste', dx: 1, dy: -1 }
];
const objects = [
  { id: 'bed', name: 'cama', x: 2, y: 1, w: 4, h: 2, z: 4, land: true, color: '#a77b63' },
  { id: 'wardrobe', name: 'guarda-roupas', x: 8, y: 1, w: 2, h: 2, z: 10, land: false, color: '#675b78' },
  { id: 'chair', name: 'cadeira', x: 6, y: 3, w: 1, h: 1, z: 3, land: true, color: '#bb8a4e' },
  { id: 'desk', name: 'escrivaninha', x: 7, y: 3, w: 2, h: 2, z: 5, land: true, color: '#8a694f' },
  { id: 'slippers', name: 'chinelos', x: 2, y: 7, w: 2, h: 1, z: 1, land: true, color: '#668d9a' },
  { id: 'toybox', name: 'caixa de brinquedos', x: 8, y: 7, w: 1, h: 1, z: 2, land: true, color: '#c26b4e' },
  { id: 'sofa', name: 'sofázinho / ponto A', x: 1, y: 8, w: 1, h: 1, z: 3, land: true, color: '#688774' },
  { id: 'window', name: 'janela aberta', x: 5, y: 0, w: 1, h: 1, z: 6, land: false, color: '#4e9dc2' },
  { id: 'door', name: 'porta / ponto B', x: 11, y: 5, w: 1, h: 1, z: 1, land: false, color: '#9e784e' }
];

const state = {
  x: 1, y: 8, z: 3, heading: 0, durability: 3, maxDurability: 3,
  score: 0, turn: 1, cameraX: 1, cameraY: 8, cameraZ: 3,
  selecting: false, intensityIndex: 1, timer: null, busy: false, lang: 'pt', log: []
};

function esc(text) { return String(text).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
function cellPoint(x, y, z = 1) { return { x: ORIGIN_X + x * CELL_W, y: ORIGIN_Y + y * CELL_H - (z - 1) * Z_STEP }; }
function svgEl(tag, attrs = {}) { const el = document.createElementNS('http://www.w3.org/2000/svg', tag); Object.entries(attrs).forEach(([k,v]) => el.setAttribute(k, v)); return el; }
function rect(x, y, width, height, attrs = {}) { return svgEl('rect', { x, y, width, height, ...attrs }); }
function objectAt(x, y) { return objects.find(o => x >= o.x && x < o.x + o.w && y >= o.y && y < o.y + o.h); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function drawBoard() {
  boardLayer.replaceChildren(); objectLayer.replaceChildren(); cameraFocus.replaceChildren();
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = cellPoint(x, y);
    const cell = rect(p.x, p.y, CELL_W, CELL_H, { class: `grid-cell ${(x+y)%2?'alt':''}` });
    cell.setAttribute('aria-label', `Casa X ${x}, Y ${y}`); boardLayer.appendChild(cell);
  }
  // Parede norte, sul, oeste e limite da porta
  for (let x = 0; x < W; x++) { boardLayer.appendChild(rect(ORIGIN_X + x*CELL_W, ORIGIN_Y - CELL_H, CELL_W, CELL_H, { class:'wall-cell' })); boardLayer.appendChild(rect(ORIGIN_X + x*CELL_W, ORIGIN_Y + H*CELL_H, CELL_W, CELL_H, { class:'wall-cell' })); }
  for (let y = 0; y < H; y++) { boardLayer.appendChild(rect(ORIGIN_X - CELL_W, ORIGIN_Y + y*CELL_H, CELL_W, CELL_H, { class:'wall-cell' })); }
  objects.forEach(drawObject);
  const focus = cellPoint(state.cameraX, state.cameraY, state.cameraZ);
  cameraFocus.appendChild(rect(focus.x+2, focus.y+2, CELL_W-4, CELL_H-4, { class:'focus-cell' }));
}
function drawObject(o) {
  const p = cellPoint(o.x, o.y, o.z); const width = o.w * CELL_W - 8; const height = o.h * CELL_H - 8; const lift = (o.z - 1) * Z_STEP;
  objectLayer.appendChild(rect(p.x+6, p.y+lift+8, width, height, { class:'object-shadow' }));
  objectLayer.appendChild(svgEl('polygon', { points:`${p.x+5},${p.y+height+5} ${p.x+width+5},${p.y+height+5} ${p.x+width+5},${p.y+height+5+lift} ${p.x+5},${p.y+height+5+lift}`, class:'object-side', fill:shade(o.color, -28) }));
  objectLayer.appendChild(rect(p.x+4, p.y+4, width, height, { class:'object-top', fill:o.color, rx:5 }));
  const label = svgEl('text', { x:p.x+width/2+4, y:p.y+height/2+9, class:'object-label' }); label.textContent = shortName(o.name); objectLayer.appendChild(label);
}
function shortName(name) { return ({'guarda-roupas':'guarda-roupas','sofázinho / ponto A':'PONTO A','porta / ponto B':'PONTO B','caixa de brinquedos':'caixa','janela aberta':'janela'}[name] || name).toUpperCase(); }
function shade(hex, amount) { const n=parseInt(hex.slice(1),16); const r=clamp((n>>16)+amount,0,255),g=clamp(((n>>8)&255)+amount,0,255),b=clamp((n&255)+amount,0,255); return `rgb(${r},${g},${b})`; }

function drawPlane(x = state.x, y = state.y, z = state.z, heading = state.heading) {
  planeLayer.replaceChildren(); const p = cellPoint(x, y, z); const g = svgEl('g', { transform:`translate(${p.x + CELL_W/2},${p.y + CELL_H/2}) rotate(${heading*45})`, 'aria-label':'Avião de papel' });
  g.appendChild(svgEl('polygon', { points:'0,-20 39,15 5,8 0,23 -5,8 -39,15', class:'plane-shape' }));
  g.appendChild(svgEl('polygon', { points:'0,-20 5,8 0,23 -5,8', class:'plane-heading' })); planeLayer.appendChild(g);
}
function drawPath(points) {
  pathLayer.replaceChildren(); points.forEach((p, i) => { const c=cellPoint(p.x,p.y,p.z); pathLayer.appendChild(rect(c.x+4,c.y+4,CELL_W-8,CELL_H-8,{class:'path-cell',opacity:Math.max(.35,1-i/points.length)})); });
}

function renderStats() {
  const labels = state.lang === 'pt' ? ['Fase','Durabilidade','Posição','Pontuação'] : ['Stage','Durability','Position','Score'];
  const values = [`Quarto · turno ${state.turn}`, `${state.durability}/${state.maxDurability}`, `X ${state.x}, Y ${state.y}, Z ${state.z}`, state.score];
  stats.innerHTML = labels.map((l,i)=>`<div class="stat"><span class="stat-label">${l}</span><strong class="stat-value">${values[i]}</strong></div>`).join('');
  const d = directions[state.heading]; directionText.textContent = (state.lang==='pt' ? 'Direção atual: ' : 'Current direction: ') + d.name;
  const preview = buildFlight(intensities[state.intensityIndex]);
  const previewName = intensities[state.intensityIndex].name;
  flightPreview.textContent = state.lang==='pt'
    ? `${previewName}: sobe ${intensities[state.intensityIndex].height} camadas, avança para ${d.name} e pousa aproximadamente em X ${preview.x}, Y ${preview.y}, Z ${preview.z}.`
    : `${previewName}: rises ${intensities[state.intensityIndex].height} layers, advances ${d.name} and lands approximately at X ${preview.x}, Y ${preview.y}, Z ${preview.z}.`;
  updateLaunchLabel();
  cameraStatus.textContent = (state.lang==='pt' ? `Câmera: X ${state.cameraX}, Y ${state.cameraY}, Z ${state.cameraZ}` : `Camera: X ${state.cameraX}, Y ${state.cameraY}, Z ${state.cameraZ}`);
}
function addLog(text) { state.log.unshift(text); state.log = state.log.slice(0,4); logList.innerHTML = state.log.map(x=>`<li>${esc(x)}</li>`).join(''); }
function announce(text) { addLog(text); }
function ensureAudioContext() {
  if (!audioContext) {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    audioContext = new Context(); audioBus = audioContext.createGain(); audioBus.gain.value = .42; audioBus.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}
function indicatorTone(frequency, duration=.07, type='sine', volume=.035) {
  const ctx = ensureAudioContext(); if (!ctx || !audioBus) return;
  const osc = ctx.createOscillator(); const gain = ctx.createGain(); const now = ctx.currentTime;
  osc.type = type; osc.frequency.setValueAtTime(frequency, now); gain.gain.setValueAtTime(volume, now); gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
  osc.connect(gain); gain.connect(audioBus); osc.start(now); osc.stop(now + duration + .02);
}
function startMusic() {
  ensureAudioContext();
  music.play().then(() => { musicButton.textContent='❚❚ Pausar música'; audioStatus.textContent='Música tocando · indicadores discretos disponíveis.'; }).catch(() => { audioStatus.textContent='Pressione Tocar música para iniciar a faixa.'; });
}
function toggleMusic() { ensureAudioContext(); if (music.paused) startMusic(); else { music.pause(); musicButton.textContent='▶ Tocar música'; audioStatus.textContent='Música parada · indicadores discretos disponíveis.'; } }
function render() { drawBoard(); drawPlane(); renderStats(); }

function rotate(amount) {
  if (state.busy) return; state.heading = (state.heading + amount + directions.length) % directions.length;
  const message = state.lang==='pt' ? `Avião apontado para ${directions[state.heading].name}.` : `Plane pointed ${directions[state.heading].name}.`;
  announce(message); indicatorTone(amount < 0 ? 280 : 360, .065, 'triangle', .028); drawPlane(); renderStats();
}
function cameraMove(dx,dy,dz=0) {
  state.cameraX=clamp(state.cameraX+dx,0,W-1); state.cameraY=clamp(state.cameraY+dy,0,H-1); state.cameraZ=clamp(state.cameraZ+dz,0,10);
  const message = state.lang==='pt' ? `Câmera em X ${state.cameraX}, Y ${state.cameraY}, Z ${state.cameraZ}.` : `Camera at X ${state.cameraX}, Y ${state.cameraY}, Z ${state.cameraZ}.`;
  announce(message); if (dz) indicatorTone(dz > 0 ? 620 : 190, .06, 'sine', .022); renderStats(); drawBoard();
}
function updateLaunchLabel() {
  const current = intensities[state.intensityIndex].name;
  launchButton.childNodes[0].nodeValue = state.selecting
    ? (state.lang==='pt' ? `2 — Confirmar ${current}` : `2 — Confirm ${current}`)
    : (state.lang==='pt' ? '1 — Escolher intensidade' : '1 — Choose intensity');
}
function openIntensity() {
  if (state.busy) return;
  if (!state.selecting) {
    state.selecting=true; intensityPanel.hidden=false; launchButton.classList.add('armed');
    announce(state.lang==='pt' ? 'Seleção de intensidade iniciada. Pressione Lançar novamente para confirmar.' : 'Intensity selection started. Press Launch again to confirm.');
    indicatorTone(260, .08, 'triangle', .026); state.timer=setInterval(()=>{ state.intensityIndex=(state.intensityIndex+1)%3; renderIntensity(); },850); renderIntensity();
  } else { clearInterval(state.timer); state.selecting=false; intensityPanel.hidden=true; launchButton.classList.remove('armed'); indicatorTone(520, .09, 'triangle', .03); executeLaunch(intensities[state.intensityIndex]); }
}
function renderIntensity() {
  const current=intensities[state.intensityIndex]; meterFill.style.width=`${(state.intensityIndex+1)*33.333}%`; meterFill.style.background=current.color;
  intensityHint.textContent=state.lang==='pt' ? `${current.name}: sobe ${current.height} camadas e avança ${current.distance} casas.` : `${current.name}: rises ${current.height} layers and advances ${current.distance} cells.`;
  intensityChoices.innerHTML=intensities.map((v,i)=>`<button type="button" data-intensity="${i}" class="${i===state.intensityIndex?'selected':''}">${v.name}<span>${v.distance} casas</span></button>`).join('');
  intensityChoices.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{ state.intensityIndex=+b.dataset.intensity; indicatorTone([220,330,440][state.intensityIndex], .075, 'sine', .026); renderIntensity(); }));
  renderStats();
}
function buildFlight(intensity) {
  const d=directions[state.heading]; const topZ=state.z+intensity.height; const points=[];
  for(let z=state.z+1;z<=topZ;z++) points.push({x:state.x,y:state.y,z});
  let x=state.x,y=state.y, wind=false;
  for(let i=1;i<=intensity.distance;i++) { x=clamp(x+d.dx,0,W-1); y=clamp(y+d.dy,0,H-1); points.push({x,y,z:topZ}); if(!wind && x===5 && topZ>=4 && topZ<=6){ y=clamp(y+2,0,H-1); points.push({x,y,z:topZ}); wind=true; } }
  const landing = objectAt(x,y); const landZ=landing && landing.land ? landing.z : 1; points.push({x,y,z:Math.max(1,topZ-1)}); points.push({x,y,z:landZ});
  return { points, x, y, z:landZ, landing, wind };
}
function executeLaunch(intensity) {
  state.busy=true; launchButton.disabled=true; drawPath([]); const flight=buildFlight(intensity); drawPath(flight.points);
  startMusic();
  const flightAudio=new Audio('assets/audio/spitfire-flight.wav'); flightAudio.volume=.34; flightAudio.play().catch(()=>{});
  indicatorTone(520, .1, 'triangle', .035);
  announce(state.lang==='pt' ? `Lançamento ${intensity.name.toLowerCase()} confirmado.` : `${intensity.name} launch confirmed.`);
  let i=0; const tick=()=>{ const p=flight.points[i]; drawPlane(p.x,p.y,p.z,state.heading); i++; if(i<flight.points.length){ setTimeout(tick,150); } else finishFlight(flight); }; tick();
}
function finishFlight(flight) {
  state.x=flight.x; state.y=flight.y; state.z=flight.z; state.turn++;
  if(flight.wind) announce(state.lang==='pt' ? 'A corrente da janela empurrou o avião duas casas para o sul.' : 'The window current pushed the plane two cells south.');
  if(flight.landing && !flight.landing.land) { state.durability--; indicatorTone(150, .16, 'sawtooth', .035); announce(state.lang==='pt' ? `Colisão com ${flight.landing.name}. Durabilidade perdida.` : `Collision with ${flight.landing.name}. Durability lost.`); }
  else if(flight.landing && flight.landing.land && flight.landing.id!=='sofa') { indicatorTone(390, .12, 'sine', .028); announce(state.lang==='pt' ? `Pouso sobre ${flight.landing.name}.` : `Landed on ${flight.landing.name}.`); }
  if(flight.x===11 && flight.y===5) { state.score+=100; indicatorTone(660, .2, 'triangle', .04); announce(state.lang==='pt' ? 'Chegada à porta! Fase concluída: +100 pontos.' : 'Reached the door! Stage complete: +100 points.'); }
  else state.score+=10;
  if(state.durability<=0) { announce(state.lang==='pt' ? 'O avião foi destruído. Reinicie a fase para tentar novamente.' : 'The plane was destroyed. Restart the stage to try again.'); }
  state.busy=false; launchButton.disabled=false; drawPath([]); render();
}
function radar() {
  const nearby=objects.filter(o=>Math.abs(o.x-state.x)+Math.abs(o.y-state.y)<=6);
  const lines=nearby.length ? nearby.map(o=>`${o.name}, X ${o.x}, Y ${o.y}, Z ${o.z}`).join('; ') : (state.lang==='pt'?'nenhum elemento relevante':'no relevant element');
  radarOutput.textContent=(state.lang==='pt' ? `Radar — posição X ${state.x}, Y ${state.y}, Z ${state.z}. Próximos: ${lines}.` : `Radar — position X ${state.x}, Y ${state.y}, Z ${state.z}. Nearby: ${lines}.`);
  announce(state.lang==='pt' ? 'Radar consultado.' : 'Radar consulted.');
}
function query(key) { if(key==='radar') radar(); else if(key==='rotateLeft') rotate(-1); else if(key==='rotateRight') rotate(1); else if(key==='launch') openIntensity(); else if(key==='north') cameraMove(0,-1); else if(key==='south') cameraMove(0,1); else if(key==='east') cameraMove(1,0); else if(key==='west') cameraMove(-1,0); else if(key==='zUp') cameraMove(0,0,1); else if(key==='zDown') cameraMove(0,0,-1); }
function reset() { if(state.timer) clearInterval(state.timer); Object.assign(state,{x:1,y:8,z:3,heading:0,durability:3,score:0,turn:1,cameraX:1,cameraY:8,cameraZ:3,selecting:false,busy:false,log:[]}); intensityPanel.hidden=true; launchButton.disabled=false; radarOutput.textContent=''; announce(state.lang==='pt'?'Fase reiniciada.':'Stage restarted.'); render(); }

const english = { title:'The bedroom', lead:'Plan each launch. The plane rises, advances and descends within the turn.', status:'Stage state', board:'Bedroom board', camera:'Camera', plane:'Plane', radar:'Radar', log:'Latest actions', reset:'Restart stage', radarButton:'Read Radar', launch:'Launch', north:'North', south:'South', east:'East', west:'West', zUp:'Raise camera', zDown:'Lower camera' };
const portuguese = { title:'O quarto', lead:'Planeje cada lançamento. O avião sobe, avança e desce dentro do turno.', status:'Estado da fase', board:'Tabuleiro do quarto', camera:'Câmera', plane:'Avião', radar:'Radar', log:'Últimas ações', reset:'Reiniciar fase', radarButton:'Ler o Radar', launch:'Lançar', north:'Norte', south:'Sul', east:'Leste', west:'Oeste', zUp:'Elevar câmera', zDown:'Abaixar câmera' };
function setLanguage() {
  state.lang=state.lang==='pt'?'en':'pt'; const t=state.lang==='pt'?portuguese:english; document.documentElement.lang=state.lang==='pt'?'pt-BR':'en';
  document.querySelector('h1').textContent=t.title; document.querySelector('.lead').textContent=t.lead; document.querySelector('#status-title').textContent=t.status; document.querySelector('#board-title').textContent=t.board; document.querySelector('#camera-title').textContent=t.camera; document.querySelector('#plane-title').textContent=t.plane; document.querySelector('#radar-title').textContent=t.radar; document.querySelector('#log-title').textContent=t.log; document.querySelector('#resetButton').textContent=t.reset; document.querySelector('#radarButton').textContent=t.radarButton; document.querySelector('#launchButton').childNodes[0].nodeValue=t.launch;
  document.querySelectorAll('[data-action]').forEach(b=>{ const key=b.dataset.action; if(t[key]) b.childNodes[0].nodeValue=t[key]; });
  document.querySelector('#languageButton').textContent=state.lang==='pt'?'English':'Português';
  document.querySelector('#audio-title').textContent=state.lang==='pt'?'Áudio da fase':'Stage audio';
  musicButton.textContent=music.paused ? (state.lang==='pt'?'▶ Tocar música':'▶ Play music') : (state.lang==='pt'?'❚❚ Pausar música':'❚❚ Pause music');
  audioStatus.textContent=music.paused ? (state.lang==='pt'?'Música parada · indicadores discretos disponíveis.':'Music stopped · subtle indicators available.') : (state.lang==='pt'?'Música tocando · indicadores discretos disponíveis.':'Music playing · subtle indicators available.');
  renderStats(); if(state.selecting) renderIntensity();
}

document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>query(button.dataset.action)));
musicButton.addEventListener('click',toggleMusic);
document.querySelector('#resetButton').addEventListener('click',reset);
document.querySelector('#languageButton').addEventListener('click',setLanguage);
document.addEventListener('keydown',e=>{ if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return; const k=e.key.toLowerCase(); if(k==='a') query('rotateLeft'); else if(k==='d') query('rotateRight'); else if(k===' ') { e.preventDefault(); query('launch'); } else if(k==='r') query('radar'); else if(k==='w') announce((state.lang==='pt'?'Direção atual: ':'Current direction: ')+directions[state.heading].name); else if(k==='h') announce((state.lang==='pt'?`Durabilidade: ${state.durability} de ${state.maxDurability}.`:`Durability: ${state.durability} of ${state.maxDurability}.`)); else if(k==='s') announce((state.lang==='pt'?`Pontuação: ${state.score}.`:`Score: ${state.score}.`)); else if(e.key==='ArrowUp') query('north'); else if(e.key==='ArrowDown') query('south'); else if(e.key==='ArrowLeft') query('west'); else if(e.key==='ArrowRight') query('east'); else if(e.key==='PageUp') query('zUp'); else if(e.key==='PageDown') query('zDown'); else if(e.key==='Escape' && state.selecting){ clearInterval(state.timer);state.selecting=false;intensityPanel.hidden=true;announce(state.lang==='pt'?'Seleção cancelada.':'Selection cancelled.'); } });

addLog('Fase carregada. O avião começa no ponto A, sobre o sofázinho.'); render();
