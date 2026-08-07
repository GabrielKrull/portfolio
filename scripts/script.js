// ═══════════════════════════════════════════════
// TEMA CLARO / ESCURO
// ═══════════════════════════════════════════════

const btn = document.getElementById('modoClaroEscuro');
const html = document.documentElement;

// Quando o botão de tema é clicado, troca entre o modo claro e escuro
// e atualiza o ícone do botão para refletir o tema atual
btn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    btn.innerHTML = isLight
        ? '<span class="material-icons">light_mode</span>'
        : '<span class="material-icons">dark_mode</span>';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
});


// ═══════════════════════════════════════════════
// MENU HAMBÚRGUER (mobile)
// ═══════════════════════════════════════════════

const menuBurger = document.getElementById("menu-burger");
const menu = document.getElementById("menu");

// Quando o ícone de menu é clicado, abre ou fecha o menu de navegação
menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    menu.classList.toggle("visivel");
});

// Quando o usuário clica em qualquer link do menu, o menu fecha automaticamente
menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuBurger.classList.remove("active");
        menu.classList.remove("visivel");
    });
});


// ═══════════════════════════════════════════════
// DADOS PESSOAIS
// ═══════════════════════════════════════════════

// Preenche na página o nome, título profissional e bio
function carregarDados() {
    const NOME = "Gabriel Alves Krull";
    let tituloProfissional = "Estudante de Engenharia de Software e Técnico em Desenvolvimento de Sistemas";
    let minhaBio = "Apaixonado por tecnologia, desenvolvimento de software e criação de soluções que unem design e lógica.";

    document.getElementById("meuNome").innerText = NOME;
    document.getElementById("tituloProfissional").innerText = tituloProfissional;
    document.getElementById("minhaBio").innerText = minhaBio;
}


// ═══════════════════════════════════════════════
// DATAS DE INGRESSO E FORMATURA
// ═══════════════════════════════════════════════

// Datas das formaturas e ingressão nos cursos
let anoFormatura1 = 2030, mesFormatura1 = 12, diaFormatura1 = 26;
let anoFormatura2 = 2026, mesFormatura2 = 12,  diaFormatura2 = 15;
let anoIngresso1  = 2026, mesIngresso1  = 2,  diaIngresso1  = 1;
let anoIngresso2  = 2025, mesIngresso2  = 2,  diaIngresso2  = 10;

// Exibe na página os anos de formatura e quantos anos faltam para cada curso
function carregarData() {
    document.getElementById("anoFormatura1").innerText =
        "Ano das Formaturas: " + anoFormatura1 + " e " + anoFormatura2;
    document.getElementById("tempoRestanteFormaturas").innerText =
        `Anos restantes para formar: ${anoFormatura1 - anoIngresso1} anos para Engenharia de Software e ${anoFormatura2 - anoIngresso2} ano para Técnico em Desenvolvimento de Sistemas`;
}

// Recebe uma data e calcula a diferença entre hoje e essa data,
// retornando o resultado em dias, meses e anos
function calcular(ano, mes, dia) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const alvo   = new Date(ano, mes - 1, dia);
    const diffMs = alvo - hoje;
    const dias   = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const anos   = Math.floor(Math.abs(dias) / 365);
    const meses  = Math.floor((Math.abs(dias) % 365) / 30);
    const diasR  = Math.abs(dias) % 30;
    return { dias, anos, meses, diasR };
}

// Calcula o tempo restante para cada formatura e ingresso
const f1 = calcular(anoFormatura1, mesFormatura1, diaFormatura1);
const f2 = calcular(anoFormatura2, mesFormatura2, diaFormatura2);
const i1 = calcular(anoIngresso1,  mesIngresso1,  diaIngresso1);
const i2 = calcular(anoIngresso2,  mesIngresso2,  diaIngresso2);

// Exibe na página as datas de ingresso e o tempo restante para as formaturas.
// Se a Formatura 1 já passou, exibe "Já formei" no lugar
function carregarDuração() {
    document.getElementById("formatura2").innerHTML =
        `Formatura 2: ${f2.dias} dias (${f2.anos}a ${f2.meses}m ${f2.diasR}d)`;
    document.getElementById("ingresso1").innerHTML =
        `Ingresso 1: 01 de fevereiro de 2026`;
    document.getElementById("ingresso2").innerHTML =
        `Ingresso 2: 10 de fevereiro de 2025`;
    document.getElementById("formatura1").innerHTML = f1.dias > 0
        ? `Formatura 1: ${f1.dias} dias (${f1.anos}a ${f1.meses}m ${f1.diasR}d)`
        : "Já formei";
}


// ═══════════════════════════════════════════════
// HABILIDADES
// ═══════════════════════════════════════════════

// Lista de habilidades que serão exibidas na página
let habilidades = ["HTML", "CSS", "JS", "Python", "SQL", "Java"];
// insere uma nova habilidade usando o push
habilidades.push("Linux");

const listaHabilidades = document.getElementById("lista-habilidades");

// Ícone correspondente a cada habilidade
const icones = {
    HTML:"code", CSS:"palette", JS:"javascript",
    Python:"terminal", SQL:"storage", Java:"coffee", Linux:"laptop"
};

// Cria um item visual na lista para cada habilidade, com ícone e nome
for (let i = 0; i < habilidades.length; i++) {
    const li = document.createElement("li");
    li.classList.add("habilidade-item");
    li.innerHTML = `
        <span class="material-icons habilidade-icon">${icones[habilidades[i]] ?? "star"}</span>
        <span class="habilidade-nome">${habilidades[i]}</span>
    `;
    listaHabilidades.appendChild(li);
}


// ═══════════════════════════════════════════════
// QUIZ DE PERFIL DEV
// ═══════════════════════════════════════════════

const btnVisual     = document.getElementById("btn-visual");
const btnLogica     = document.getElementById("btn-logica");
const resultadoQuiz = document.getElementById("resultado-quiz");

// Contadores de votos para cada perfil
let pontosFront = 0, pontosBack = 0;

// Cada clique em um botão adiciona um ponto ao perfil correspondente
// e chama a função que exibe o resultado atualizado
btnVisual.addEventListener("click", () => { pontosFront++; exibirPerfil(); });
btnLogica.addEventListener("click", () => { pontosBack++;  exibirPerfil(); });

// Com base nos votos acumulados, exibe o perfil dominante:
// Front-End, Back-End ou Full Stack (empate)
function exibirPerfil() {
    if (pontosFront > pontosBack) {
        resultadoQuiz.className = "front-end";
        resultadoQuiz.innerHTML = `<strong>🎨 Você tem perfil Front-End!</strong><br>
            Você curte criar interfaces, trabalhar com cores, layouts e a experiência do usuário.
            Tecnologias pra você: HTML, CSS, React, Vue.`;
    } else if (pontosBack > pontosFront) {
        resultadoQuiz.className = "back-end";
        resultadoQuiz.innerHTML = `<strong>⚙️ Você tem perfil Back-End!</strong><br>
            Você curte resolver problemas complexos, trabalhar com dados e fazer a mágica acontecer nos bastidores.
            Tecnologias pra você: Node.js, Python, bancos de dados.`;
    } else {
        resultadoQuiz.className = "full-stack";
        resultadoQuiz.innerHTML = `<strong>🔄 Você tem perfil Full Stack!</strong><br>
            Você curte tanto o visual quanto a lógica — o melhor dos dois mundos.
            Tecnologias pra você: HTML, CSS, Node.js, React, bancos de dados.`;
    }
}


// ═══════════════════════════════════════════════
// PROJETOS
// ═══════════════════════════════════════════════

// Lista com as informações de cada projeto: nome, tecnologias, ferramentas, descrição e link
let projetos = [
    {
        nome: "EstaciON",
        tecnologias: ["Python, Tkinter, SQLite, fpdf2, datetime."],
        conhecimentos: "VsCode, Git, GitHub, pip, PyInstaller.",
        descricao: "Aplicação desktop feita para controle de estacionamento, com interface gráfica, banco de dados e gerador de relatórios.",
        link: "https://github.com/GabrielKrull/EstaciON"
    },
    {
        nome: "M&G Energia",
        tecnologias: ["HTML, CSS, JS"],
        conhecimentos: "VsCode, Git, GitHub",
        descricao: "Site para uma empresa de energia, com HTML, CSS e JS.",
        link: "https://github.com/GabrielKrull/M-G-Energia"
    },
    {
        nome: "Sistema de catalogar filmes, seriados e livros",
        tecnologias: ["Python, Random e Sys"],
        conhecimentos: "VsCode, Modularização, Hieraquia",
        descricao: "Sistema para catalogar filmes, seriados e livros, com Python, Random e Sys.",
        link: "https://github.com/GabrielKrull/sistemadefilmeserielivro"
    },
    {
        nome: "Qualidade de Software",
        tecnologias: ["HTML, CSS, JS"],
        conhecimentos: "VsCode, Git, GitHub, QA e Testes",
        descricao: "Site simples para testes de qualidade de software, com HTML, CSS e JS.",
        link: "https://github.com/GabrielKrull/Trabalho-Qualidade-de-software"
    }
];

const listaProjetos = document.getElementById("lista-projetos");

// Cria um card visual na página para cada projeto da lista acima
for (let i = 0; i < projetos.length; i++) {
    const li = document.createElement("li");
    li.classList.add("projeto-item");
    li.innerHTML = `
        <h3 class="projeto-nome">${projetos[i].nome}</h3>
        <p class="projeto-tecnologias"><span class="projeto-label">Tecnologias:</span> ${projetos[i].tecnologias}</p>
        <p class="projeto-conhecimentos"><span class="projeto-label">Ferramentas:</span> ${projetos[i].conhecimentos}</p>
        <p class="projeto-descricao">${projetos[i].descricao}</p>
        <a href="${projetos[i].link}" target="_blank" class="projeto-link">Ver projeto</a>
    `;
    listaProjetos.appendChild(li);
}


// ═══════════════════════════════════════════════
// SAUDAÇÃO AO VISITANTE
// ═══════════════════════════════════════════════

const inputNome         = document.getElementById("inputNome");
const btnEnviar         = document.getElementById("btnEnviar");
const saudacaoVisitante = document.getElementById("saudacao-visitante");

// Lê o nome digitado pelo visitante e exibe uma saudação personalizada
// com "Bom dia", "Boa tarde" ou "Boa noite" de acordo com o horário atual.
// Se o campo estiver vazio, o campo treme para avisar o usuário
function mostrarSaudacao() {
    const nome = inputNome.value.trim();
    if (!nome) {
        inputNome.classList.add("input-erro");
        setTimeout(() => inputNome.classList.remove("input-erro"), 600);
        return;
    }
    const hora    = new Date().getHours();
    const periodo = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
    saudacaoVisitante.innerHTML = `
        <span class="material-icons saudacao-icon">waving_hand</span>
        <span>${periodo}, <strong>${nome}</strong>! Seja bem-vindo(a) ao meu portfólio. Espero que goste do que encontrar por aqui!</span>
    `;
    saudacaoVisitante.classList.add("visivel");
    inputNome.value = "";
    inputNome.focus();
}

// Impede que o visitante digite números ou símbolos no campo de nome
inputNome.addEventListener("input", () => {
    inputNome.value = inputNome.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
});

// Permite enviar o nome tanto pelo botão quanto pressionando Enter
btnEnviar.addEventListener("click", mostrarSaudacao);
inputNome.addEventListener("keydown", e => {
    if (e.key === "Enter") mostrarSaudacao();
});


// ═══════════════════════════════════════════════
// BUSCA DE POKÉMON
// ═══════════════════════════════════════════════

const inputNomePoke = document.getElementById("inputNomePoke");
const btnEnviarPoke = document.getElementById("btnEnviarPoke");
const mostrarPoke   = document.getElementById("mostrarPoke");

// Busca as informações do Pokémon digitado usando a API PokéAPI,
// e exibe o nome, tipo, habilidade e imagem dele na página.
// Se o Pokémon não for encontrado, mostra uma mensagem de erro
async function buscarPokemon() {
    const nome = inputNomePoke.value.trim().toLowerCase();

    if (!nome) {
        inputNomePoke.classList.add("input-erro");
        setTimeout(() => inputNomePoke.classList.remove("input-erro"), 600);
        return;
    }

    const dados = await buscarAPI(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (dados) {
        const nomePokemon = dados.name;
        const tipo        = dados.types[0].type.name;
        const habilidade  = dados.abilities[1]?.ability.name ?? dados.abilities[0].ability.name;
        const imagem      = dados.sprites.front_default;

        mostrarPoke.innerHTML = `
            <span>O pokémon <strong>${nomePokemon}</strong> tem o tipo <strong>${tipo}</strong>
            e a habilidade <strong>${habilidade}</strong>.</span> <p>Aqui está uma imagem dele:</p>
            <img src="${imagem}" alt="${nomePokemon}" style="image-rendering:pixelated; width:96px; height:96px;"/>
        `;
        mostrarPoke.classList.add("visivel");
        inputNomePoke.value = "";
        inputNomePoke.focus();
    } else {
        mostrarPoke.innerHTML = `<span>Pokémon não encontrado. Verifique o nome e tente novamente.</span>`;
        mostrarPoke.classList.add("visivel");
    }
}

// Impede que o usuário digite números no campo de nome do Pokémon
inputNomePoke.addEventListener("input", () => {
    inputNomePoke.value = inputNomePoke.value.replace(/[^a-zA-ZÀ-ÿ\s\-]/g, "");
});

// Permite buscar o Pokémon tanto pelo botão quanto pressionando Enter
btnEnviarPoke.addEventListener("click", buscarPokemon);
inputNomePoke.addEventListener("keydown", e => {
    if (e.key === "Enter") buscarPokemon();
});


// ═══════════════════════════════════════════════
// ANIMAÇÃO DE SCROLL
// ═══════════════════════════════════════════════

// Prepara as seções da página para aparecerem com animação conforme
// o usuário vai rolando a tela para baixo (cada seção "entra" suavemente
// quando fica visível na tela)
function initScrollReveal() {
    const fotoPerfil = document.getElementById("foto-perfil");
    const dados      = document.getElementById("dados");
    if (fotoPerfil) fotoPerfil.classList.add("reveal-left");
    if (dados)      dados.classList.add("reveal-right");

    const secaoVisitante = document.getElementById("secao-visitante");
    if (secaoVisitante) secaoVisitante.classList.add("reveal");

    const secaoBio = document.getElementById("secao-bio");
    if (secaoBio) secaoBio.classList.add("reveal-left");

    const secaoDatas = document.getElementById("secao-datas");
    if (secaoDatas) secaoDatas.classList.add("reveal");

    const quiz = document.getElementById("quiz");
    if (quiz) quiz.classList.add("reveal");

    const secaoProjetos = document.getElementById("secao-projetos");
    if (secaoProjetos) {
        const titulo = secaoProjetos.querySelector(".subtitulo");
        if (titulo) titulo.classList.add("reveal");
    }

    const listaHab  = document.getElementById("lista-habilidades");
    if (listaHab)  listaHab.classList.add("reveal-stagger");

    const listaProj = document.getElementById("lista-projetos");
    if (listaProj) listaProj.classList.add("reveal-stagger");

    // Fica "observando" cada seção e, quando ela entra na tela,
    // dispara a animação de aparecimento
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visivel-scroll");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-stagger")
        .forEach(el => observer.observe(el));
}

// Inicia as animações de scroll assim que a página termina de carregar
window.addEventListener("load", initScrollReveal);