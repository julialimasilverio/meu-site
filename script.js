// script.js

// Dados para os Componentes Dinâmicos
const dadosCarrossel = [
    {
        titulo: "Bullying Verbal",
        descricao: "Insultos, apelidos pejorativos, provocações e ameaças que buscam desestabilizar a vítima psicologicamente."
    },
    {
        titulo: "Bullying Físico",
        descricao: "Agressões corporais, empurrões, socos, pontapés ou o ato de danificar os pertences da vítima intencionalmente."
    },
    {
        titulo: "Cyberbullying",
        descricao: "Agressões virtuais ocorridas na internet, redes sociais e aplicativos de mensagens, com espalhamento de boatos e fotos."
    },
    {
        titulo: "Bullying Relacional / Social",
        descricao: "Exclusão sistemática de grupos de amigos, isolamento forçado e difamação da imagem pública do estudante."
    }
];

const dadosFAQ = [
    {
        pergunta: "Qual é a diferença entre uma brincadeira comum e o bullying?",
        resposta: "A principal diferença reside no consentimento, na reciprocidade e na intencionalidade. No bullying há repetição, intenção de magoar e um desequilíbrio de poder, não havendo espaço para diversão mútua."
    },
    {
        pergunta: "Como a escola identifica os casos de bullying?",
        resposta: "Por meio de observação contínua de professores e inspetores, pesquisas anônimas periódicas, apoio psicopedagógico e escuta ativa de relatos prestados por alunos e familiares."
    },
    {
        pergunta: "Quais as responsabilidades legais sobre o bullying nas escolas?",
        resposta: "Segundo a legislação de proteção à infância e juventude, as instituições de ensino têm o dever legal de estabelecer medidas diretas de conscientização, prevenção e combate à violência sistemática."
    }
];

// Estado Global da Aplicação
let tamanhoFonteAtual = 16;
let indiceSlideAtual = 0;

document.addEventListener('DOMContentLoaded', () => {
    inicializarAbas();
    inicializarAcessibilidade();
    renderizarCarrossel();
    renderizarAcordeao();
});

// Lógica de Troca de Abas
function inicializarAbas() {
    const botoesAba = document.querySelectorAll('.tab-btn');
    const conteudosAba = document.querySelectorAll('.tab-content');
    const gatilhosInternos = document.querySelectorAll('.btn-tab-trigger');

    function alternarAba(idAbaAlvo) {
        botoesAba.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === idAbaAlvo);
        });

        conteudosAba.forEach(aba => {
            aba.classList.toggle('active', aba.id === idAbaAlvo);
        });
    }

    botoesAba.forEach(btn => {
        btn.addEventListener('click', () => {
            const idAlvo = btn.getAttribute('data-tab');
            alternarAba(idAlvo);
        });
    });

    gatilhosInternos.forEach(gatilho => {
        gatilho.addEventListener('click', (e) => {
            e.preventDefault();
            const idAlvo = gatilho.getAttribute('data-target');
            alternarAba(idAlvo);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Lógica de Acessibilidade (Tamanho de Fonte e Alto Contraste)
function inicializarAcessibilidade() {
    const btnAumentar = document.getElementById('btn-increase-font');
    const btnDiminuir = document.getElementById('btn-decrease-font');
    const btnContraste = document.getElementById('btn-toggle-contrast');

    btnAumentar.addEventListener('click', () => {
        const novaFonte = tamanhoFonteAtual + 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            tamanhoFonteAtual = novaFonte;
            document.body.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    btnDiminuir.addEventListener('click', () => {
        const novaFonte = tamanhoFonteAtual - 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            tamanhoFonteAtual = novaFonte;
            document.body.style.fontSize = `${tamanhoFonteAtual}px`;
        }
    });

    btnContraste.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
}

// Renderização e Controle do Carrossel
function renderizarCarrossel() {
    const track = document.getElementById('carousel-track');
    const btnPrev = document.getElementById('prev-slide');
    const btnNext = document.getElementById('next-slide');

    if (!track) return;

    track.innerHTML = dadosCarrossel.map(item => `
        <div class="carousel-slide">
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </div>
    `).join('');

    function atualizarPosicao() {
        track.style.transform = `translateX(-${indiceSlideAtual * 100}%)`;
    }

    btnNext.addEventListener('click', () => {
        indiceSlideAtual = (indiceSlideAtual + 1) % dadosCarrossel.length;
        atualizarPosicao();
    });

    btnPrev.addEventListener('click', () => {
        indiceSlideAtual = (indiceSlideAtual - 1 + dadosCarrossel.length) % dadosCarrossel.length;
        atualizarPosicao();
    });
}

// Renderização e Controle do Acordeão
function renderizarAcordeao() {
    const container = document.getElementById('accordion-container');
    if (!container) return;

    container.innerHTML = dadosFAQ.map((item, index) => `
        <div class="accordion-item" data-index="${index}">
            <button class="accordion-header">
                <span>${item.pergunta}</span>
                <span class="icon">+</span>
            </button>
            <div class="accordion-body">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');

    const itensAcordeao = container.querySelectorAll('.accordion-item');

    itensAcordeao.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const estaAtivo = item.classList.contains('active');

            itensAcordeao.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.icon').textContent = '+';
            });

            if (!estaAtivo) {
                item.classList.add('active');
                item.querySelector('.icon').textContent = '-';
            }
        });
    });
}