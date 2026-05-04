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
let anoFormatura1 = 2030;
let anoFormatura2 = 2026;
let anoIngresso1 = 2026;
let anoIngresso2 = 2025;
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