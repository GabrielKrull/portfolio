const btn = document.getElementById('modoClaroEscuro');
const html = document.documentElement;
 
btn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    btn.innerHTML = isLight
        ? '<span class="material-icons">light_mode</span>'
        : '<span class="material-icons">dark_mode</span>';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
});
 
const NOME = "Gabriel Alves Krull";
let tituloProfissional = "Estudante de Engenharia de Software e Técnico em Desenvolvimento de Sistemas";
let minhaBio = "Apaixonado por tecnologia, desenvolvimento de software e soluções que unem design e lógica.";
 
let anoFormatura1 = 2030, mesFormatura1 = 12, diaFormatura1 = 26;
let anoFormatura2 = 2026, mesFormatura2 = 9, diaFormatura2 = 15;
let anoIngresso1 = 2026, mesIngresso1 = 2, diaIngresso1 = 1;
let anoIngresso2 = 2025, mesIngresso2 =2, diaIngresso2 = 10;
 
document.getElementById("meuNome").innerText = NOME;
document.getElementById("tituloProfissional").innerText = tituloProfissional;
document.getElementById("minhaBio").innerText = minhaBio;
document.getElementById("anoFormatura1").innerText = "Ano das Formaturas: " + anoFormatura1 + " e " + anoFormatura2;
document.getElementById("tempoRestanteFormaturas").innerText =
    `Anos restantes para formar: ${anoFormatura1 - anoIngresso1} anos para Engenharia de Software e ${anoFormatura2 - anoIngresso2} ano para Técnico em Desenvolvimento de Sistemas`;
 
function calcular(ano, mes, dia) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const alvo = new Date(ano, mes - 1, dia);
    const diffMs = alvo - hoje;
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const anos  = Math.floor(Math.abs(dias) / 365);
    const meses = Math.floor((Math.abs(dias) % 365) / 30);
    const diasR = Math.abs(dias) % 30;
    return { dias, anos, meses, diasR };
}
 
const f1 = calcular(anoFormatura1, mesFormatura1, diaFormatura1);
const f2 = calcular(anoFormatura2, mesFormatura2, diaFormatura2);
const i1 = calcular(anoIngresso1, mesIngresso1, diaIngresso1);
const i2 = calcular(anoIngresso2, mesIngresso2, diaIngresso2);
 
document.getElementById("formatura2").innerHTML =
    `Formatura 2: ${f2.dias} dias (${f2.anos}a ${f2.meses}m ${f2.diasR}d)`;
document.getElementById("ingresso1").innerHTML =
    `Ingresso 1: 01 de fevereiro de 2026`;
document.getElementById("ingresso2").innerHTML =
    `Ingresso 2: 10 de fevereiro de 2025`;
document.getElementById("formatura1").innerHTML = f1.dias > 0
    ? `Formatura 1: ${f1.dias} dias (${f1.anos}a ${f1.meses}m ${f1.diasR}d)`
    : "Já formei";
 
// ── HABILIDADES ──
const habilidades = ["HTML", "CSS", "JS", "Python", "SQL", "Java"];
const listaHabilidades = document.getElementById("lista-habilidades");
const icones = { HTML:"code", CSS:"palette", JS:"javascript", Python:"terminal", SQL:"storage", Java:"coffee" };
 
for (let i = 0; i < habilidades.length; i++) {
    const li = document.createElement("li");
    li.classList.add("habilidade-item");
    li.innerHTML = `
        <span class="material-icons habilidade-icon">${icones[habilidades[i]] ?? "star"}</span>
        <span class="habilidade-nome">${habilidades[i]}</span>
    `;
    listaHabilidades.appendChild(li);
}

let nota = 8;
let aprovado = (nota >= 6)? "Aprovado" : "Reprovado";

/*document.write(`<p> Nota: ${nota} - ${aprovado} </p>`)*/

let diaSemana = 4;

switch (diaSemana){
  case 1: "Domingo"; break;
  case 2: "Segunda-feira"; break;
  case 3: "Terça-feira"; break;
  case 4: "Quarta-feira"; break;
  case 5: "Quinta-feita"; break;
  case 6: "Sexta-feira"; break;
  case 7: "Sábado"; break;

}

// ─── HABILIDADES ──────────────────────────────────────────────
const habilidades = ["HTML", "CSS", "JS", "Python", "SQL", "Java"];

const listaHabilidades = document.getElementById("lista-habilidades");

const icones = {
  HTML:   "code",
  CSS:    "palette",
  JS:     "javascript",
  Python: "terminal",
  SQL:    "storage",
  Java:   "coffee"
};

for (let i = 0; i < habilidades.length; i++) {
  const li = document.createElement("li");
  li.classList.add("habilidade-item");

  li.innerHTML = `
    <span class="material-icons habilidade-icon">${icones[habilidades[i]] ?? "star"}</span>
    <span class="habilidade-nome">${habilidades[i]}</span>
  `;

  listaHabilidades.appendChild(li);
}

// ─── QUIZ DE PERFIL ───────────────────────────────────────────
const btnVisual     = document.getElementById("btn-visual");
const btnLogica     = document.getElementById("btn-logica");
const resultadoQuiz = document.getElementById("resultado-quiz");
let pontosFront = 0, pontosBack = 0;
 
btnVisual.addEventListener("click", () => { pontosFront++; exibirPerfil(); });
btnLogica.addEventListener("click", () => { pontosBack++;  exibirPerfil(); });
 
function exibirPerfil() {
  if (pontosFront > pontosBack) {
    resultadoQuiz.classList.remove("back-end", "full-stack");
    resultadoQuiz.classList.add("front-end");
    resultadoQuiz.innerHTML = `<strong>🎨 Você tem perfil Front-End!</strong><br>
      Você curte criar interfaces, trabalhar com cores, layouts e a experiência do usuário.
      Tecnologias pra você: HTML, CSS, React, Vue.`;

  } else if (pontosBack > pontosFront) {
    resultadoQuiz.classList.remove("front-end", "full-stack");
    resultadoQuiz.classList.add("back-end");
    resultadoQuiz.innerHTML = `<strong>⚙️ Você tem perfil Back-End!</strong><br>
      Você curte resolver problemas complexos, trabalhar com dados e fazer a mágica acontecer nos bastidores.
      Tecnologias pra você: Node.js, Python, bancos de dados.`;

  } else {
    resultadoQuiz.classList.remove("front-end", "back-end");
    resultadoQuiz.classList.add("full-stack");
    resultadoQuiz.innerHTML = `<strong>🔄 Você tem perfil Full Stack!</strong><br>
      Você curte tanto o visual quanto a lógica — o melhor dos dois mundos.
      Tecnologias pra você: HTML, CSS, Node.js, React, bancos de dados.`;
  }
}
