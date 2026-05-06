
const btn = document.getElementById('modoClaroEscuro');
        const html = document.documentElement;

        btn.addEventListener('click', () => {
            const isLight = html.getAttribute('data-theme') === 'light';
         btn.innerHTML = isLight ? '<span class="material-icons">light_mode</span> Modo Claro'
                        : '<span class="material-icons">dark_mode</span> Modo Escuro';
            html.setAttribute('data-theme', isLight ? 'dark' : 'light');
        });

const NOME = "Gabriel Alves Krull";
let tituloProfissional = "Estudante de Engenharia de Software" + " e " + "Técnico em Desenvolvimento de Sistemas";
let minhaBio = "Estudante de Engenharia de Software"+ " e " +"Técnico em Desenvolvimento de Sistemas";

//Variáveis de data da formatura
let anoFormatura1 = 2030;
let anoFormatura2 = 2026;
let mesFormatura1 = 12;
let mesFormatura2 = 3;
let diaFormatura1 = 26;
let diaFormatura2 = 15;

//Variáveis de data da ingressão
let anoIngresso1 = 2026;
let anoIngresso2 = 2025;
let mesIngresso1 = 8;
let mesIngresso2 = 1;
let diaIngresso1 = 26;
let diaIngresso2 = 1;

//Varáveis datas, usando a biblioteca Date
let dataAtual = new Date(); //Data atual
let mesAtual = dataAtual.getMonth() +1; //Mês atual (0-11, por isso +1)
let anoAtual = dataAtual.getFullYear();// Ano atual
let diaAtual = dataAtual.getDate();// Dia atual

//Variáveis
let indefinido;
let nulo = null;
let curso = {
    nome: "Engenharia de Software",
    semestre:1,
    disciplinaAtual: "Design Responsivo"
}

console.log(typeof nulo);
console.log(typeof indefinido);
console.log(typeof anoFormatura1);
console.log(typeof anoFormatura2);
console.log(typeof anoIngresso1);
console.log(typeof anoIngresso2);
console.log(typeof minhaBio);
console.log(typeof NOME);
console.log(typeof curso);

document.getElementById("meuNome").innerText = NOME;
document.getElementById("tituloProfissional").innerText = tituloProfissional;
document.getElementById("minhaBio").innerText = minhaBio;
document.getElementById("anoFormatura1").innerText = "Ano das Formaturas: "+ anoFormatura1 + " e " + anoFormatura2;

document.getElementById("tempoRestanteFormaturas").innerText = `Anos restantes para formar: ${anoFormatura1 - anoIngresso1} anos para Engenharia de Software e ${anoFormatura2 - anoIngresso2} ano para Técnico em Desenvolvimento de Sistemas`;

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

const f1 = calcular(2030, 12, 26);
const f2 = calcular(2026, 12, 15);
const i1 = calcular(2026, 12, 26);
const i2 = calcular(2025, 1, 1);



document.getElementById("formatura2").innerHTML = 
  `Formatura 2: ${f2.dias} dias (${f2.anos}a ${f2.meses}m ${f2.diasR}d)`;

document.getElementById("ingresso1").innerHTML = 
  `Ingresso 1: ${i1.dias} dias (${i1.anos}a ${i1.meses}m ${i1.diasR}d)`;

document.getElementById("ingresso2").innerHTML = 
  `Ingresso 2: ${i2.dias} dias`;

if (f1.dias > 0){
  document.getElementById("formatura1").innerHTML = 
  `Formatura 1: ${f1.dias} dias (${f1.anos}a ${f1.meses}m ${f1.diasR}d)`;
}else{
  document.getElementById("formatura1").innerHTML = "Já formei"
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

// ─── QUIZ DE PERFIL ───────────────────────────────────────────
const btnVisual     = document.getElementById("btn-visual");
const btnLogica     = document.getElementById("btn-logica");
const resultadoQuiz = document.getElementById("resultado-quiz");

let pontosFront = 0;
let pontosBack  = 0;

btnVisual.addEventListener("click", function() {
  pontosFront++;
  exibirPerfil();
});

btnLogica.addEventListener("click", function() {
  pontosBack++;
  exibirPerfil();
});

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


