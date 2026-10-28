// ========================================
// TEMA CLARO / ESCURO
// ========================================

const btnTema = document.getElementById('modoClaroEscuro');
const htmlEl = document.documentElement;

if (btnTema) {
    // Verifica tema salvo ou usa light como padrão
    const temaSalvo = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', temaSalvo);
    
    // Atualiza ícone
    const icon = btnTema.querySelector('.material-icons');
    if (icon) {
        icon.textContent = temaSalvo === 'light' ? 'dark_mode' : 'light_mode';
    }
    
    btnTema.addEventListener('click', () => {
        const isLight = htmlEl.getAttribute('data-theme') === 'light';
        const novoTema = isLight ? 'dark' : 'light';
        
        htmlEl.setAttribute('data-theme', novoTema);
        localStorage.setItem('theme', novoTema);
        
        if (icon) {
            icon.textContent = novoTema === 'light' ? 'dark_mode' : 'light_mode';
        }
    });
}

// ========================================
// MENU HAMBURGER (MOBILE)
// ========================================

const menuBurger = document.getElementById("menu-burger");
const menuNav = document.getElementById("menu");

if (menuBurger && menuNav) {
    menuBurger.addEventListener("click", () => {
        menuBurger.classList.toggle("active");
        menuNav.classList.toggle("open");
    });

    // Fecha menu ao clicar em link
    menuNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menuBurger.classList.remove("active");
            menuNav.classList.remove("open");
        });
    });
}

// ========================================
// DADOS PESSOAIS
// ========================================

function carregarDados() {
    const tituloProfissional = document.getElementById("tituloProfissional");
    const minhaBio = document.getElementById("minhaBio");
    
    if (tituloProfissional) {
        tituloProfissional.textContent = "Desenvolvedor Frontend apaixonado por transformar ideias em experiências digitais incríveis.";
    }
    
    if (minhaBio) {
        minhaBio.textContent = "Apaixonado por tecnologia, desenvolvimento de software e criação de soluções que unem design e lógica.";
    }
}

// ========================================
// HABILIDADES
// ========================================

let habilidades = ["HTML", "CSS", "JS", "Python", "SQL", "Java", "Linux"];

const listaHabilidades = document.getElementById("lista-habilidades");

const iconesHabilidades = {
    HTML: "code",
    CSS: "palette",
    JS: "javascript",
    Python: "terminal",
    SQL: "storage",
    Java: "coffee",
    Linux: "laptop"
};

if (listaHabilidades) {
    listaHabilidades.innerHTML = '';
    for (let i = 0; i < habilidades.length; i++) {
        const skillItem = document.createElement("div");
        skillItem.classList.add("skill-item");
        skillItem.innerHTML = `
            <span class="material-icons skill-icon">${iconesHabilidades[habilidades[i]] ?? "star"}</span>
            <span class="skill-name">${habilidades[i]}</span>
        `;
        listaHabilidades.appendChild(skillItem);
    }
}

// ========================================
// QUIZ DE PERFIL DEV
// ========================================

const btnVisual = document.getElementById("btn-visual");
const btnLogica = document.getElementById("btn-logica");
const resultadoQuiz = document.getElementById("resultado-quiz");

let pontosFront = 0;
let pontosBack = 0;

if (btnVisual) {
    btnVisual.addEventListener("click", () => {
        pontosFront++;
        exibirPerfil();
    });
}

if (btnLogica) {
    btnLogica.addEventListener("click", () => {
        pontosBack++;
        exibirPerfil();
    });
}

function exibirPerfil() {
    if (!resultadoQuiz) return;
    
    resultadoQuiz.className = "quiz-result";
    
    if (pontosFront > pontosBack) {
        resultadoQuiz.classList.add("front-end");
        resultadoQuiz.innerHTML = `
            <strong>✨ Você tem perfil Front-End!</strong><br><br>
            Você curte criar interfaces, trabalhar com cores, layouts e a experiência do usuário.<br>
            <strong>Tecnologias pra você:</strong> HTML, CSS, JavaScript, React, Vue.
        `;
    } else if (pontosBack > pontosFront) {
        resultadoQuiz.classList.add("back-end");
        resultadoQuiz.innerHTML = `
            <strong>⚙️ Você tem perfil Back-End!</strong><br><br>
            Você curte resolver problemas complexos, trabalhar com dados e fazer a mágica acontecer nos bastidores.<br>
            <strong>Tecnologias pra você:</strong> Node.js, Python, SQL, bancos de dados.
        `;
    } else {
        resultadoQuiz.classList.add("full-stack");
        resultadoQuiz.innerHTML = `
            <strong>🚀 Você tem perfil Full Stack!</strong><br><br>
            Você curte tanto o visual quanto a lógica — o melhor dos dois mundos.<br>
            <strong>Tecnologias pra você:</strong> HTML, CSS, JavaScript, Node.js, Python, bancos de dados.
        `;
    }
}

// ========================================
// PROJETOS
// ========================================

let projetos = [
    {
        nome: "EstaciON",
        categoria: "APLICAÇÃO DESKTOP",
        descricao: "Aplicação desktop feita para controle de estacionamento, com interface gráfica, banco de dados e gerador de relatórios.",
        tecnologias: ["Python", "Tkinter", "SQLite", "fpdf2"],
        link: "https://github.com/GabrielKrull/EstaciON"
    },
    {
        nome: "M&G Energia",
        categoria: "SITE INSTITUCIONAL",
        descricao: "Site para uma empresa de energia, com HTML, CSS e JavaScript, focado em apresentação institucional.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/GabrielKrull/M-G-Energia"
    },
    {
        nome: "Sistema de catalogar filmes, seriados e livros",
        categoria: "SISTEMA CONSOLE",
        descricao: "Sistema para catalogar filmes, seriados e livros, desenvolvido em Python com foco em organização e lógica.",
        tecnologias: ["Python"],
        link: "https://github.com/GabrielKrull/sistemadefilmeserielivro"
    },
    {
        nome: "Qualidade de Software",
        categoria: "SITE EDUCACIONAL",
        descricao: "Site simples para testes de qualidade de software, com HTML, CSS e JavaScript.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/GabrielKrull/Trabalho-Qualidade-de-software"
    }
];

const listaProjetos = document.getElementById("lista-projetos");

if (listaProjetos) {
    listaProjetos.innerHTML = '';
    for (let i = 0; i < projetos.length; i++) {
        const card = document.createElement("article");
        card.classList.add("project-card");
        card.innerHTML = `
            <div class="project-card-image">
                <div class="project-card-placeholder">
                    <span class="project-placeholder-initials">${projetos[i].nome.substring(0, 2).toUpperCase()}</span>
                </div>
                <a href="${projetos[i].link}" target="_blank" rel="noopener noreferrer" class="project-card-arrow" aria-label="Ver projeto ${projetos[i].nome}">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.75 11.25L11.25 6.75M11.25 6.75H6.75M11.25 6.75V11.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
            <div class="project-card-content">
                <span class="project-card-category">${projetos[i].categoria}</span>
                <h3 class="project-card-title">${projetos[i].nome}</h3>
                <p class="project-card-desc">${projetos[i].descricao}</p>
                <a href="${projetos[i].link}" target="_blank" rel="noopener noreferrer" class="project-card-link">
                    <span>Ver projeto</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.333 8H12.667M12.667 8L8 3.333M12.667 8L8 12.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        `;
        listaProjetos.appendChild(card);
    }
}

// ========================================
// BUSCA DE POKÉMON
// ========================================

const inputNomePoke = document.getElementById("inputNomePoke");
const btnEnviarPoke = document.getElementById("btnEnviarPoke");
const mostrarPoke = document.getElementById("mostrarPoke");

async function buscarPokemon() {
    if (!inputNomePoke || !mostrarPoke) return;
    
    const nome = inputNomePoke.value.trim().toLowerCase();

    if (!nome) {
        inputNomePoke.classList.add("input-erro");
        setTimeout(() => inputNomePoke.classList.remove("input-erro"), 600);
        return;
    }

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        if (!resposta.ok) {
            throw new Error("Não encontrado");
        }
        const dados = await resposta.json();
        
        const nomePokemon = dados.name;
        const tipo = dados.types[0].type.name;
        const habilidade = dados.abilities[1]?.ability.name ?? dados.abilities[0].ability.name;
        const imagem = dados.sprites.front_default;

        mostrarPoke.innerHTML = `
            <img src="${imagem}" alt="${nomePokemon}" style="image-rendering:pixelated; width:64px; height:64px;"/>
            <span>O pokémon <strong>${nomePokemon}</strong> tem o tipo <strong>${tipo}</strong> e a habilidade <strong>${habilidade}</strong>.</span>
        `;
        mostrarPoke.style.display = "flex";
        inputNomePoke.value = "";
        inputNomePoke.focus();
    } catch (erro) {
        mostrarPoke.innerHTML = `<span>Pokémon não encontrado. Verifique o nome e tente novamente.</span>`;
        mostrarPoke.style.display = "flex";
    }
}

if (inputNomePoke) {
    inputNomePoke.addEventListener("input", () => {
        inputNomePoke.value = inputNomePoke.value.replace(/[^a-zA-Z\-]/g, "");
    });
}

if (btnEnviarPoke) {
    btnEnviarPoke.addEventListener("click", buscarPokemon);
}

if (inputNomePoke) {
    inputNomePoke.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            buscarPokemon();
        }
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    
    // Adiciona classe para animação de entrada
    setTimeout(() => {
        document.querySelectorAll('.hero-animate').forEach((el, index) => {
            el.style.opacity = '1';
        });
    }, 100);
});
