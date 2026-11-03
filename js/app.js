const heart = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3 1.7-1.8 3.1-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
const CHAVE = "qet-lidas";
let lidas = new Set();
try { lidas = new Set(JSON.parse(localStorage.getItem(CHAVE) || "[]")); } catch(e) {}
function salvar(){ try { localStorage.setItem(CHAVE, JSON.stringify([...lidas])); } catch(e) {} }

const grade = document.getElementById("grade");
cartas.forEach((c, i) => {
  const b = document.createElement("button");
  b.className = "env" + (lidas.has(i) ? " lida" : "");
  b.setAttribute("aria-label", "Abrir cartinha: " + c.nome);
  b.innerHTML = '<span class="corpo"></span><span class="selo-cera">' + heart + '</span><span class="nome">' + c.nome + '</span>';
  b.addEventListener("click", (ev) => abrir(i, ev));
  grade.appendChild(b);
});

function atualizarProgresso(){
  const n = lidas.size;
  document.getElementById("progresso").textContent =
    n === 0 ? "12 cartinhas esperando por você" :
    n === cartas.length ? "você abriu todas — e eu escreveria mil mais" :
    n + " de " + cartas.length + " abertas";
}
atualizarProgresso();

/* capa */
const capa = document.getElementById("capa");
const envGrande = document.getElementById("envGrande");
const secCartas = document.getElementById("cartas");
function mostrarCartas(imediato){
  if (imediato){ capa.style.display = "none"; secCartas.classList.add("visivel"); return; }
  envGrande.classList.add("aberto");
  setTimeout(() => capa.classList.add("saindo"), 1500);
  setTimeout(() => { capa.style.display = "none"; secCartas.classList.add("visivel"); window.scrollTo(0,0); }, 2200);
}
envGrande.addEventListener("click", () => mostrarCartas(false));
document.getElementById("fecharTudo").addEventListener("click", () => {
  secCartas.classList.remove("visivel");
  envGrande.classList.remove("aberto");
  capa.classList.remove("saindo");
  capa.style.display = "";
  window.scrollTo(0,0);
});

/* carta aberta */
const veu = document.getElementById("veu");
let atual = 0, ultimoFoco = null;
function render(){
  document.getElementById("cartaTexto").textContent = cartas[atual].texto;
  document.getElementById("contador").textContent = (atual + 1) + " / " + cartas.length;
  document.getElementById("ant").disabled = atual === 0;
  document.getElementById("prox").disabled = atual === cartas.length - 1;
  document.getElementById("papel").scrollTop = 0;
  marcar(atual);
}
function marcar(i){
  lidas.add(i); salvar();
  grade.children[i].classList.add("lida");
  atualizarProgresso();
}
function coracoes(x, y){
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let k = 0; k < 9; k++){
    const s = document.createElement("span");
    s.className = "coracao"; s.textContent = "♥";
    s.style.left = (x - 9) + "px"; s.style.top = (y - 9) + "px";
    s.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    s.style.animationDelay = (k * 60) + "ms";
    s.style.fontSize = (12 + Math.random() * 14) + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }
}
function abrir(i, ev){
  ultimoFoco = document.activeElement;
  atual = i; render();
  const r = ev.currentTarget.getBoundingClientRect();
  coracoes(r.left + r.width/2, r.top + r.height*0.6);
  veu.classList.add("aberto");
  document.getElementById("fechar").focus();
}
function fechar(){
  veu.classList.remove("aberto");
  if (ultimoFoco) ultimoFoco.focus();
}
document.getElementById("fechar").addEventListener("click", fechar);
veu.addEventListener("click", e => { if (e.target === veu) fechar(); });
document.getElementById("ant").addEventListener("click", () => { if (atual > 0){ atual--; render(); } });
document.getElementById("prox").addEventListener("click", () => { if (atual < cartas.length - 1){ atual++; render(); } });
document.addEventListener("keydown", e => {
  if (!veu.classList.contains("aberto")) return;
  if (e.key === "Escape") fechar();
  if (e.key === "ArrowRight" && atual < cartas.length - 1){ atual++; render(); }
  if (e.key === "ArrowLeft" && atual > 0){ atual--; render(); }
});
