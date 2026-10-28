// ========================================
// RETRO MODE - Inspired by hancore.dev
// Complete reimplementation with vim-like editor, keyboard, hands
// ========================================

(function() {
    'use strict';
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Paletas de cores
    const palettes = {
        phosphor: {
            bg: '#0C0C0C',
            bgEditor: '#141414',
            text: '#D8D4B4',
            textSecondary: '#9B9882',
            textMuted: '#5A5848',
            keyword: '#9DB57A',
            string: '#A8B5A0',
            number: '#D97A5F',
            comment: '#6E6B5A',
            function: '#B8A882',
            variable: '#C4B89A'
        },
        green: {
            bg: '#000000',
            bgEditor: '#000000',
            text: '#00ff00',
            textSecondary: '#00aa00',
            textMuted: '#005500',
            keyword: '#00ff00',
            string: '#00dd00',
            number: '#00ff00',
            comment: '#006600',
            function: '#00ff00',
            variable: '#00ff00'
        },
        paper: {
            bg: '#f4f1ea',
            bgEditor: '#f7f4ed',
            text: '#2d2a22',
            textSecondary: '#5c564a',
            textMuted: '#8b8575',
            keyword: '#4a7c2a',
            string: '#6b4e3d',
            number: '#b85c38',
            comment: '#8b8575',
            function: '#3d5a80',
            variable: '#2d2a22'
        }
    };
    
    let currentPalette = 'phosphor';
    
    // Código para animar
    const codeLines = [
        { file: 'portfolio/about.ts', content: [
            { text: '// Gabriel Krull - Frontend Developer', type: 'comment' },
            { text: '', type: 'empty' },
            { text: 'interface Developer {', type: 'keyword' },
            { text: '  name: string;', type: 'variable' },
            { text: '  role: "Frontend Developer";', type: 'string' },
            { text: '  passion: "crafting digital experiences";', type: 'string' },
            { text: '  stack: string[];', type: 'variable' },
            { text: '}', type: 'keyword' },
            { text: '', type: 'empty' },
            { text: 'const gabriel: Developer = {', type: 'keyword' },
            { text: '  name: "Gabriel Alves Krull",', type: 'variable' },
            { text: '  role: "Frontend Developer",', type: 'string' },
            { text: '  passion: "crafting digital experiences",', type: 'string' },
            { text: '  stack: ["HTML", "CSS", "JavaScript", "TypeScript"],', type: 'array' },
            { text: '};', type: 'keyword' },
            { text: '', type: 'empty' },
            { text: 'function buildPortfolio(): void {', type: 'keyword' },
            { text: '  console.log("Building with creativity & code");', type: 'function' },
            { text: '}', type: 'keyword' },
            { text: '', type: 'empty' },
            { text: 'buildPortfolio();', type: 'function' }
        ]}
    ];
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    let typingTimeout = null;
    let cursorBlinkInterval = null;
    
    function initRetroMode() {
        if (typeof document === 'undefined') return;
        const retroToggleBtn = document.getElementById('retroToggleBtn');
        const html = document.documentElement;
        
        if (!retroToggleBtn) return;
        
        const savedRetro = localStorage.getItem('retroMode') === 'true';
        const savedPalette = localStorage.getItem('retroPalette') || 'phosphor';
        currentPalette = savedPalette;
        
        if (savedRetro) {
            html.setAttribute('data-theme', 'retro');
            html.setAttribute('data-palette', currentPalette);
            if (retroToggleBtn.querySelector('span')) {
                retroToggleBtn.querySelector('span').textContent = '[ RETURN TO TIMELINE ]';
            }
            createRetroHero();
        }
        
        retroToggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            
            if (currentTheme === 'retro') {
                const savedTheme = localStorage.getItem('theme') || 'light';
                html.setAttribute('data-theme', savedTheme);
                html.removeAttribute('data-palette');
                if (retroToggleBtn.querySelector('span')) {
                    retroToggleBtn.querySelector('span').textContent = '[ THERE IS ANOTHER TIMELINE ]';
                }
                localStorage.setItem('retroMode', 'false');
                // Remove retro hero if exists
                const retroHero = document.getElementById('retro-hero');
                if (retroHero) retroHero.remove();
            } else {
                localStorage.setItem('theme', currentTheme);
                html.setAttribute('data-theme', 'retro');
                html.setAttribute('data-palette', currentPalette);
                if (retroToggleBtn.querySelector('span')) {
                    retroToggleBtn.querySelector('span').textContent = '[ RETURN TO TIMELINE ]';
                }
                localStorage.setItem('retroMode', 'true');
                createRetroHero();
            }
        });
        
        // Theme switcher in retro mode
        document.addEventListener('click', (e) => {
            if (e.target.id === 'retroThemeBtn') {
                const palettes = ['phosphor', 'green', 'paper'];
                const currentIndex = palettes.indexOf(currentPalette);
                currentPalette = palettes[(currentIndex + 1) % palettes.length];
                document.documentElement.setAttribute('data-palette', currentPalette);
                localStorage.setItem('retroPalette', currentPalette);
            }
        });
    }
    
    function createRetroHero() {
        // Remove existing retro hero
        const existing = document.getElementById('retro-hero');
        if (existing) existing.remove();
        
        const main = document.querySelector('main');
        if (!main) return;
        
        const retroHero = document.createElement('section');
        retroHero.id = 'retro-hero';
        retroHero.className = 'retro-hero';
        retroHero.innerHTML = `
            <div class="retro-container">
                <div class="retro-header">
                    <span class="retro-logo">gabrielkrull.dev</span>
                </div>
                
                <div class="retro-editor">
                    <div class="retro-editor-header">
                        <span class="retro-filename">portfolio/about.ts</span>
                    </div>
                    <div class="retro-editor-body">
                        <div class="retro-line-numbers" id="retroLineNumbers"></div>
                        <div class="retro-code-area">
                            <div id="retroCodeContent"></div>
                            <span class="retro-cursor">█</span>
                        </div>
                    </div>
                    <div class="retro-status-bar">
                        <span class="retro-mode">INSERT</span>
                        <span class="retro-fileinfo">portfolio/about.ts</span>
                        <span class="retro-position" id="retroPosition">1:1</span>
                    </div>
                    <div class="retro-command-line">
                        <span class="retro-prompt">:</span><span class="retro-command">colorscheme phosphor</span>
                    </div>
                </div>
                
                <div class="retro-keyboard-section">
                    <div class="retro-keyboard">
                        <div class="retro-keyboard-row">
                            <span class="retro-key">esc</span>
                            <span class="retro-key">1</span>
                            <span class="retro-key">2</span>
                            <span class="retro-key">3</span>
                            <span class="retro-key">4</span>
                            <span class="retro-key">5</span>
                            <span class="retro-key">6</span>
                            <span class="retro-key">7</span>
                            <span class="retro-key">8</span>
                            <span class="retro-key">9</span>
                            <span class="retro-key">0</span>
                        </div>
                        <div class="retro-keyboard-row">
                            <span class="retro-key">tab</span>
                            <span class="retro-key">q</span>
                            <span class="retro-key">w</span>
                            <span class="retro-key">e</span>
                            <span class="retro-key">r</span>
                            <span class="retro-key">t</span>
                            <span class="retro-key">y</span>
                            <span class="retro-key">u</span>
                            <span class="retro-key">i</span>
                            <span class="retro-key">o</span>
                            <span class="retro-key">p</span>
                        </div>
                        <div class="retro-keyboard-row">
                            <span class="retro-key">caps</span>
                            <span class="retro-key">a</span>
                            <span class="retro-key">s</span>
                            <span class="retro-key">d</span>
                            <span class="retro-key">f</span>
                            <span class="retro-key">g</span>
                            <span class="retro-key">h</span>
                            <span class="retro-key">j</span>
                            <span class="retro-key">k</span>
                            <span class="retro-key">l</span>
                            <span class="retro-key">;</span>
                        </div>
                        <div class="retro-keyboard-row">
                            <span class="retro-key">shift</span>
                            <span class="retro-key">z</span>
                            <span class="retro-key">x</span>
                            <span class="retro-key">c</span>
                            <span class="retro-key">v</span>
                            <span class="retro-key">b</span>
                            <span class="retro-key">n</span>
                            <span class="retro-key">m</span>
                            <span class="retro-key">,</span>
                            <span class="retro-key">.</span>
                            <span class="retro-key">/</span>
                        </div>
                    </div>
                    
                    <svg class="retro-hands" width="200" height="80" viewBox="0 0 200 80">
                        <g stroke="currentColor" fill="none" stroke-width="1" opacity="0.6">
                            <!-- Left hand -->
                            <path d="M 40 60 Q 35 50 40 40 L 42 35 Q 44 30 42 25 L 40 20" />
                            <circle cx="42" cy="35" r="1.5" fill="currentColor" />
                            <circle cx="40" cy="30" r="1.5" fill="currentColor" />
                            <circle cx="38" cy="25" r="1.5" fill="currentColor" />
                            <circle cx="40" cy="20" r="1.5" fill="currentColor" />
                            <path d="M 42 40 Q 48 35 52 40 L 54 45 Q 56 50 54 55 L 52 60" />
                            <circle cx="52" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="54" cy="45" r="1.5" fill="currentColor" />
                            <circle cx="56" cy="50" r="1.5" fill="currentColor" />
                            <circle cx="54" cy="55" r="1.5" fill="currentColor" />
                            <path d="M 40 60 Q 45 65 50 65 Q 55 65 60 60" />
                            <text x="30" y="75" font-size="6" fill="currentColor">[hand0: typing]</text>
                            
                            <!-- Right hand -->
                            <path d="M 140 60 Q 145 50 140 40 L 138 35 Q 136 30 138 25 L 140 20" />
                            <circle cx="138" cy="35" r="1.5" fill="currentColor" />
                            <circle cx="140" cy="30" r="1.5" fill="currentColor" />
                            <circle cx="142" cy="25" r="1.5" fill="currentColor" />
                            <circle cx="140" cy="20" r="1.5" fill="currentColor" />
                            <path d="M 138 40 Q 132 35 128 40 L 126 45 Q 124 50 126 55 L 128 60" />
                            <circle cx="128" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="126" cy="45" r="1.5" fill="currentColor" />
                            <circle cx="124" cy="50" r="1.5" fill="currentColor" />
                            <circle cx="126" cy="55" r="1.5" fill="currentColor" />
                            <path d="M 140 60 Q 135 65 130 65 Q 125 65 120 60" />
                            <text x="110" y="75" font-size="6" fill="currentColor">[hand1: tracking]</text>
                        </g>
                    </svg>
                </div>
                
                <div class="retro-theme-switcher">
                    <button id="retroThemeBtn" class="retro-theme-btn">
                        <span>enter ↵</span>
                    </button>
                    <span class="retro-theme-label">:theme</span>
                </div>
                
                <div class="retro-footer-signature">
                    <span>// construindo experiências digitais com código e criatividade</span>
                </div>
            </div>
        </section>
        `;
        
        main.insertBefore(retroHero, main.firstChild);
        
        startRetroTyping();
    }
    
    function startRetroTyping() {
        if (prefersReducedMotion) return;
        
        const codeContent = document.getElementById('retroCodeContent');
        const lineNumbers = document.getElementById('retroLineNumbers');
        const positionEl = document.getElementById('retroPosition');
        const cursor = document.querySelector('.retro-cursor');
        
        if (!codeContent || !lineNumbers) return;
        
        // Generate line numbers
        lineNumbers.innerHTML = '';
        for (let i = 1; i <= 30; i++) {
            const span = document.createElement('div');
            span.textContent = i;
            lineNumbers.appendChild(span);
        }
        
        codeContent.innerHTML = '';
        currentLineIndex = 0;
        currentCharIndex = 0;
        isTyping = true;
        
        function typeNextChar() {
            if (!isTyping) return;
            
            const file = codeLines[0];
            if (currentLineIndex >= file.content.length) {
                // Restart
                setTimeout(() => {
                    codeContent.innerHTML = '';
                    currentLineIndex = 0;
                    currentCharIndex = 0;
                    typeNextChar();
                }, 3000);
                return;
            }
            
            const currentLine = file.content[currentLineIndex];
            if (currentLine.type === 'empty') {
                codeContent.innerHTML += '<br>';
                currentLineIndex++;
                if (positionEl) {
                    positionEl.textContent = (currentLineIndex + 1) + ':1';
                }
                setTimeout(typeNextChar, 150);
                return;
            }
            
            if (currentCharIndex === 0) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'retro-code-line';
                codeContent.appendChild(lineDiv);
            }
            
            const lineDiv = codeContent.lastElementChild;
            if (!lineDiv) {
                setTimeout(typeNextChar, 50);
                return;
            }
            
            const char = currentLine.text[currentCharIndex];
            let span = document.createElement('span');
            span.textContent = char;
            
            // Apply syntax highlighting
            if (currentLine.type === 'comment') span.className = 'retro-comment';
            else if (currentLine.type === 'keyword') span.className = 'retro-keyword';
            else if (currentLine.type === 'string') span.className = 'retro-string';
            else if (currentLine.type === 'number') span.className = 'retro-number';
            else if (currentLine.type === 'function') span.className = 'retro-function';
            else if (currentLine.type === 'variable') span.className = 'retro-variable';
            else if (currentLine.type === 'array') span.className = 'retro-array';
            
            lineDiv.appendChild(span);
            
            if (positionEl) {
                positionEl.textContent = (currentLineIndex + 1) + ':' + (currentCharIndex + 2);
            }
            
            currentCharIndex++;
            
            if (currentCharIndex >= currentLine.text.length) {
                currentLineIndex++;
                currentCharIndex = 0;
                setTimeout(typeNextChar, 200);
            } else {
                setTimeout(typeNextChar, 30 + Math.random() * 40);
            }
        }
        
        // Blink cursor
        if (cursor && !prefersReducedMotion) {
            cursorBlinkInterval = setInterval(function() {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
        
        setTimeout(typeNextChar, 500);
    }
    
    function init() {
        initRetroMode();
    }
    
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
    
})();
