const botao = document.getElementById("modoClaroEscuro");

let claro = true; // começa escuro (preto)

botao.addEventListener("click", () => {
    if (claro) {

        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        botao.textContent = "Modo claro";
    } else {

        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        botao.textContent = "Modo escuro";
    }

    claro = !claro;
});

const NOME = "Gabriel Alves Krull";
let tituloProfissional = "Estudante de Engenharia de Software" + " e " + "Técnico em Desenvolvimento de Sistemas";
let minhaBio = "Estudante de Engenharia de Software"+ " e " +"Técnico em Desenvolvimento de Sistemas";

//Variáveis de data da formatura
let anoFormatura1 = 2030;
let anoFormatura2 = 2026;
let mesFormatura1 = 12;
let mesFormatura2 = 12;
let diaFormatura1 = 26;
let diaFormatura2 = 15;

//Variáveis de data da ingressão
let anoIngresso1 = 2026;
let anoIngresso2 = 2025;
let mesIngresso1 = 12;
let mesIngresso2 = 12;
let diaIngresso1 = 26;
let diaIngresso2 = 15;

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
const i2 = calcular(2025, 12, 15);

document.getElementById("formatura1").innerHTML = 
  `Formatura 1: ${f1.dias} dias (${f1.anos}a ${f1.meses}m ${f1.diasR}d)`;

document.getElementById("formatura2").innerHTML = 
  `Formatura 2: ${f2.dias} dias (${f2.anos}a ${f2.meses}m ${f2.diasR}d)`;

document.getElementById("ingresso1").innerHTML = 
  `Ingresso 1: ${i1.dias} dias (${i1.anos}a ${i1.meses}m ${i1.diasR}d)`;

document.getElementById("ingresso2").innerHTML = 
  `Ingresso 2: ${i2.dias} dias`;