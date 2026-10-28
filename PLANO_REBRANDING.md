# Plano de Rebranding Completo - Portfólio Gabriel Krull

## Objetivo
Transformar o portfólio atual em uma experiência digital sofisticada no estilo editorial contemporâneo + design digital premium, seguindo rigorosamente todas as especificações fornecidas.

## Diagnóstico do Estado Atual

| Elemento | Estado Atual | Ação |
| :-- | :-- | :-- |
| Fundo | Gradiente roxo/azulado escuro (`#281a2e` → `#1f1a36`) | Substituir por off-white `#F5F4EF` (fundo principal) |
| Paleta | Tons roxos/violeta com acentos | Migrar para paleta editorial: off-white, preto `#111411`, verde-lima `#C5FF66`, cinzas neutros |
| Tipografia | Google Sans | Implementar sistema com fonte sans-serif limpa + display expressiva para títulos |
| Layout | Grid simples, seções verticais básicas | Migrar para grid editorial 12-colunas, composições assimétricas |
| Hero | Foto circular + card de dados | Reestruturar em 3 colunas (35% / 40% / 25%) com composição editorial |
| Projetos | Cards verticais em grid | Transformar em cards horizontais com imagem 40-45% + conteúdo |
| Navegação | Simples com menu burger mobile | Header minimalista com monograma GK, links + botão "Baixar CV" |
| Interatividade | Quiz, busca Pokemon, saudação | Preservar toda funcionalidade existente |
| Tema claro/escuro | Toggle funcional | Reavaliar - nova direção é predominantemente off-white; manter toggle apenas se desejado ou remover? Especificação diz "fundo predominantemente off-white" - provavelmente fixo no novo tema |

## Sistema Visual Proposto

### Paleta de Cores
```css
:root {
  /* Cores principais */
  --bg-primary: #F5F4EF;      /* Off-white - fundo principal */
  --bg-dark: #111411;         /* Preto quase absoluto */
  --accent-lime: #C5FF66;     /* Verde-lima - destaque/CTAs */
  --text-primary: #111411;    /* Títulos e textos fortes */
  --text-secondary: #777970;  /* Textos secundários/metadados */
  --border-light: #E4E3DC;    /* Divisórias e bordas sutis */
  --bg-accent-light: #E8F2DD; /* Fundos ocasionais para cards */
}
```

### Tipografia
```css
/* Sugeridas (precisam validação) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Clash Display', 'Satoshi', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

- **Títulos principais**: Display/expressiva, peso 600-800, line-height compacto (0.95-1.1)
- **Corpo**: Sans-serif limpa, peso 400-500, line-height 1.6-1.8
- **Rótulos/Metadata**: Peso 500-600, uppercase com tracking
- **Monoespaçada**: Para elementos tipo código/pixel

### Espaçamento e Grid
- Grid: 12 colunas, max-width ~1400px, margens generosas (clamp 24px-80px)
- Espaçamento base: 8pt scale (8,16,24,32,48,64,96,128)
- Bordas: 1px solid var(--border-light)
- Border-radius: 4-8px (discreto, não exagerado)
- Transições: 200-300ms ease

## Nova Estrutura de Arquivos

```
portfolio/
├── index.html          # HTML completamente reestruturado
├── styles/
│   ├── style.css       # CSS principal com novo design system
│   ├── grid.css        # Grid system e utilitários (opcional)
│   └── responsive.css  # Media queries (opcional)
├── scripts/
│   ├── script.js       # Lógica existente adaptada para novos IDs/classes
│   └── async.js        # Funções de API (preservadas)
├── img/                # Assets existentes + novos (se necessário)
└── fonts/              # Fontes locais (se optar por não usar Google Fonts)
```

## Implementação por Seção

### 1. HEADER
**HTML:**
```html
<header class="header">
  <div class="header-container">
    <div class="header-left">
      <a href="#inicio" class="logo-monogram">GK</a>
    </div>
    <nav class="nav">
      <ul class="nav-list">
        <li><a href="#inicio" class="nav-link active">Início</a></li>
        <li><a href="#projetos" class="nav-link">Projetos</a></li>
        <li><a href="#sobre" class="nav-link">Sobre</a></li>
        <li><a href="#habilidades" class="nav-link">Habilidades</a></li>
        <li><a href="#contato" class="nav-link">Contato</a></li>
      </ul>
    </nav>
    <div class="header-right">
      <a href="..." class="cv-link">
        <span>Baixar currículo</span>
        <svg>...</svg>
      </a>
    </div>
  </div>
</header>
```

**CSS:** Sticky header, flexbox, underline animado para link ativo com `--accent-lime`.

### 2. HERO / APRESENTAÇÃO PRINCIPAL
**Layout:** CSS Grid 3 colunas no desktop
```css
.hero-grid {
  display: grid;
  grid-template-columns: 35% 40% 25%;
  gap: 2rem;
  align-items: start;
}
```

**Coluna 1 - Apresentação:**
- Marcador: `.intro-marker { background: var(--accent-lime); padding: 4px 12px; }` + "Olá, eu sou"
- Nome: `Gabriel\nKrull` em display grande, peso 800
- Descrição profissional
- CTAs: botão preto com seta + link textual
- Redes sociais monocromáticas

**Coluna 2 - Composição Visual:**
- Container com `position: relative`
- Foto profissional (se disponível) com tratamento editorial
- Janela de código estilo terminal (absoluta/overlaid)
- Grid técnico sutil em background
- Elementos geométricos em `--accent-lime`
- Código ilustrativo com syntax highlighting

**Coluna 3 - Habilidades:**
- Título "Sempre aprendendo algo novo"
- Grid compacto de skills com ícones
- Link "Ver todas as habilidades"

### 3. PROJETOS EM DESTAQUE
**Layout:** Grid com coluna introdutória + 3 cards
```css
.projects-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 3rem;
}
.projects-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
```

**Card horizontal:**
```html
<article class="project-card">
  <div class="project-image">
    <img src="..." alt="...">
    <a href="..." class="project-arrow">→</a>
  </div>
  <div class="project-content">
    <span class="project-category">CATEGORIA</span>
    <h3 class="project-title">Nome Projeto</h3>
    <p class="project-desc">Descrição curta</p>
    <a href="..." class="project-link">Ver projeto →</a>
  </div>
</article>
```

**CSS:** Flexbox horizontal, image 40-45%, borda `1px solid var(--border-light)`, border-radius 6px.

### 4. SOBRE MIM
**Layout assimétrico:**
```css
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}
.about-modules {
  display: grid;
  grid-template-rows: auto auto;
  gap: 1.5rem;
}
```

**Módulo A - Pokémon (fundo claro):**
- Background `var(--bg-accent-light)`
- Texto "Descubra qual é o meu Pokémon favorito!"
- Botão preto pequeno
- Área para ilustração pixelada (preservar funcionalidade JS existente)
- Elementos geométricos sutis

**Módulo B - Perfil dev (fundo escuro):**
- Background `var(--bg-dark)`
- Texto branco
- Botão branco
- Elemento terminal/cursor pixelado em `--accent-lime`

### 5. CONTATO
**Faixa preta:**
```css
.contact-banner {
  background: var(--bg-dark);
  color: white;
  padding: clamp(3rem, 8vw, 5rem) 0;
}
.contact-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

- Label "VAMOS CONVERSAR?" em `--accent-lime`
- Título "Gostou do meu trabalho?"
- Botão `--accent-lime` com texto preto
- Arrow icon

### 6. RODAPÉ
**Grid 4 colunas:**
```css
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
}
```

- Coluna 1: Monograma GK + descrição
- Colunas restantes: Navegação, Sociais, Contato, Voltar ao topo
- Copyright linha inferior

### 7. BLOCO ENCERRAMENTO (Opcional)
Composição com notebook/composição abstrata + fundo escuro "Obrigado por visitar!" com coração + pixel

## Adaptação do JavaScript Existente

Preciso preservar e adaptar:

| Funcionalidade | Arquivo | Ação |
| :-- | :-- | :-- |
| Toggle tema | script.js | Reavaliar - novo design é fixo off-white? Se manter, adaptar variáveis CSS |
| Menu hamburger mobile | script.js | Adaptar para novo header/nav |
| carregarDados() | script.js | Atualizar para novos IDs se mudarem estrutura |
| Habilidades | script.js | Verificar IDs `#lista-habilidades` - manter compatível |
| Quiz | script.js | Verificar IDs - manter compatível |
| Projetos | script.js | Verificar IDs `#lista-projetos` - manter compatível |
| Saudação visitante | script.js | Verificar IDs - manter compatível |
| Busca Pokémon | script.js | Verificar IDs - manter compatível |
| Scroll reveal | script.js | Adaptar classes para novo layout |
| buscarAPI() | async.js | Preservar sem alterações |

**Estratégia:** Manter IDs existentes onde possível. Se necessário renomear, atualizar JS em conjunto.

## Plano de Execução

### Fase 1: Preparação (Fundação)
- [ ] **Criar design tokens** em CSS custom properties
- [ ] **Importar fontes** (Inter, Clash Display/Satoshi)
- [ ] **Criar estrutura base** do HTML com nova semântica
- [ ] **Implementar grid system**
- [ ] **Configurar resets e base styles**

### Fase 2: Header + Hero
- [ ] **Header** com monograma GK e navegação
- [ ] **Hero 3-colunas** - estrutura completa
- [ ] **Coluna apresentação** com nome grande
- [ ] **Coluna visual** com composição (foto + código window)
- [ ] **Coluna habilidades** com grid compacto
- [ ] **Botões e links com estilo correto**

### Fase 3: Seções Principais
- [ ] **Projetos em destaque** - cards horizontais
- [ ] **Sobre mim** - layout assimétrico + módulos
- [ ] **Preservar funcionalidade Pokemon/Quiz** nos módulos
- [ ] **Contato banner** preto com CTA
- [ ] **Rodapé** organizado
- [ ] **Bloco encerramento** (se implementado)

### Fase 4: Interatividade & Responsividade
- [ ] **Adaptar JavaScript** para novos elementos sem quebrar lógica
- [ ] **Menu mobile** redesenhado
- [ ] **Responsividade tablet** (1024px)
- [ ] **Responsividade mobile** (768px, 480px)
- [ ] **Hover states** e transições
- [ ] **Scroll reveal** adaptado
- [ ] **Testes de funcionalidades** (quiz, pokemon, saudação)

### Fase 5: Polimento & Validação
- [ ] **Ajustes tipográficos** e hierarquia
- [ ] **Refinamento de espaçamentos**
- [ ] **Detalhes gráficos** (pixels, grid sutil)
- [ ] **Verificar acessibilidade** básica
- [ ] **Testar em diferentes resoluções**
- [ ] **Validar links e assets**

## Materiais Necessários

| Item | Status | Observação |
| :-- | :-- | :-- |
| Foto profissional de Gabriel | **Necessário** | Para coluna central do hero. Se não houver, usar composição abstrata |
| Arquivo CV para download | **Necessário** | Link para "Baixar currículo" no header |
| Logos/icones de tecnologias | **Opcional** | Já tem Material Icons, pode manter ou trocar |
| Imagens dos projetos | **Recomendado** | Para capas dos cards (melhora muito o visual) |
| Informações atualizadas de projetos | **Já disponível** | Em script.js já tem lista de projetos |

## Decisões Importantes a Confirmar

1. **Tema fixo ou toggle?** Especificação enfatiza fundo off-white predominantemente. Sugiro manter apenas off-white (remover toggle) para fidelidade ao conceito. Confirma?
2. **Fontes** - Posso usar Google Fonts (Inter + Clash Display) ou você tem preferências?
3. **Foto** - Tem foto profissional para usar? Caminho/arquivo?
4. **CV** - Tem arquivo PDF do currículo? Onde hospedar?
5. **Projetos** - Os 4 projetos atuais (EstaciON, M&G Energia, Sistema de filmes, Qualidade de Software) estão corretos? Quer adicionar/remover algum?
6. **Navegação** - Incluir "Habilidades" como link? Sim conforme especificado
7. **Bloco encerramento** - Incluir ou pular?
8. **Manter funcionalidades existentes** - Quiz, Pokemon, saudação. Todas devem permanecer?

## Estimativa de Alterações

| Arquivo | Tipo | Complexidade |
| :-- | :-- | :-- |
| `index.html` | Reescrita completa | Alta |
| `styles/style.css` | Reescrita completa | Alta |
| `scripts/script.js` | Adaptação de IDs/classes | Média |
| `scripts/async.js` | Sem alterações | Baixa |
| Assets (imagens) | Possíveis adições | Baixa |

## Próximos Passos

1. **Revisar este plano** e confirmar as decisões acima
2. **Fornecer materiais faltantes** (foto, CV, imagens de projetos)
3. **Aprovar início da implementação**
4. **Desenvolver incrementalmente** - posso começar pela Fase 1 após aprovação

---

**Nota:** Este plano segue fielmente todas as especificações do brief. A implementação priorizará fidelidade visual ao conceito editorial + premium, preservando 100% das funcionalidades JavaScript existentes. Todos os dados inventados serão evitados - apenas usarei informações reais do código atual ou placeholders claramente identificáveis até você fornecer os materiais corretos.
