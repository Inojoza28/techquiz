// Seleção de elementos do DOM
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const quizQuestionsSection = document.querySelector('.quiz-questions');
const startQuizSection = document.querySelector('.start-quiz');
const progressBarFill = document.querySelector('.progress-bar-fill');

// Seleção de elementos do modal e botões de download
const downloadBtn = document.getElementById('download-result-btn');
const modal = document.getElementById('modal-download');
const closeModalBtn = document.getElementById('closeModal');
const confirmDownloadBtn = document.getElementById('confirm-download');
const userNameInput = document.getElementById('user-name');


// Dados do Quiz: perguntas e opções reformuladas e ampliadas
const perguntas = [
    {
        pergunta: "Você prefere trabalhar com análise de dados ou criar interfaces visuais?",
        opcoes: ["Análise de Dados", "Interfaces Visuais", "Ambos são igualmente interessantes"]
    },
    {
        pergunta: "Você gosta mais de entender a lógica de funcionamento por trás dos sistemas ou de criar experiências de usuário atraentes?",
        opcoes: ["Lógica de Sistemas", "Experiências de Usuário"]
    },
    {
        pergunta: "Você prefere explorar novas tecnologias ou se concentrar em melhorar a segurança de sistemas existentes?",
        opcoes: ["Novas Tecnologias", "Segurança de Sistemas"]
    },
    {
        pergunta: "Você se sente mais confortável resolvendo problemas visuais ou otimizando algoritmos e desempenho?",
        opcoes: ["Problemas Visuais", "Algoritmos e Desempenho", "Tenho interesse por ambos"]
    },
    {
        pergunta: "Você gosta mais de trabalhar com grandes volumes de dados ou desenvolver aplicações web?",
        opcoes: ["Volumes de Dados", "Aplicações Web"]
    },
    {
        pergunta: "Você prefere construir sistemas de backend robustos ou protótipos visuais para o usuário?",
        opcoes: ["Sistemas de Backend", "Protótipos Visuais"]
    },
    {
        pergunta: "Você se interessa mais por proteger sistemas contra vulnerabilidades ou por criar designs inovadores?",
        opcoes: ["Proteção de Sistemas", "Design Inovador"]
    },
    {
        pergunta: "Você gosta de criar soluções rápidas e ágeis ou prefere trabalhar em projetos bem estruturados e a longo prazo?",
        opcoes: ["Soluções Rápidas e Ágeis", "Projetos Estruturados e a Longo Prazo"]
    },
    {
        pergunta: "Você prefere desenvolver funcionalidades visuais em websites ou automatizar processos usando scripts?",
        opcoes: ["Funcionalidades Visuais", "Automatização com Scripts"]
    },
    {
        pergunta: "Você tem mais interesse em liderar equipes e planejar projetos ou em codificar e desenvolver soluções técnicas?",
        opcoes: ["Liderança e Planejamento", "Codificação e Desenvolvimento Técnico"]
    },
    {
        pergunta: "Você prefere ambientes de trabalho dinâmicos e desafiadores ou processos bem definidos e organizados?",
        opcoes: ["Dinâmico e Desafiador", "Definido e Organizado"]
    },
    {
        pergunta: "Você gosta de encontrar falhas e vulnerabilidades em sistemas ou prefere focar na criação de novas funcionalidades?",
        opcoes: ["Encontrar Vulnerabilidades", "Criar Funcionalidades"]
    },
    {
        pergunta: "Você prefere trabalhar em equipe para alcançar objetivos ou individualmente, onde tenha mais controle sobre suas tarefas?",
        opcoes: ["Trabalhar em Equipe", "Trabalhar Individualmente"]
    },
    {
        pergunta: "Você se interessa mais por linguagens de programação para backend ou por ferramentas de design de interface?",
        opcoes: ["Programação Backend", "Design de Interface"]
    },
    {
        pergunta: "Você gosta mais de explorar a infraestrutura de redes ou de desenvolver interfaces amigáveis para o usuário?",
        opcoes: ["Infraestrutura de Redes", "Interfaces Amigáveis", "Tenho interesse por ambos"]
    },
    {
        pergunta: "Você prefere desenvolver e testar segurança de sistemas ou criar funcionalidades interativas?",
        opcoes: ["Segurança de Sistemas", "Funcionalidades Interativas"]
    },
    {
        pergunta: "Você gosta de analisar dados para encontrar padrões ou de desenvolver a lógica de aplicações?",
        opcoes: ["Analisar Dados", "Desenvolver Lógica"]
    },
    {
        pergunta: "Você se interessa por ferramentas visuais de design ou por infraestrutura de servidores e cloud computing?",
        opcoes: ["Ferramentas de Design", "Infraestrutura de Servidores"]
    },
    {
        pergunta: "Você prefere desenvolver projetos desde o início ou melhorar sistemas já existentes?",
        opcoes: ["Desenvolver do Zero", "Melhorar Sistemas Existentes", "Ambas as opções são interessantes"]
    },
    {
        pergunta: "Você gosta de documentar processos e gerenciar prazos ou prefere criar e testar código?",
        opcoes: ["Documentação e Gestão de Prazos", "Criação e Teste de Código"]
    },
    {
        pergunta: "Você prefere explorar conceitos de inteligência artificial e machine learning ou criar interfaces responsivas?",
        opcoes: ["Inteligência Artificial e Machine Learning", "Interfaces Responsivas"]
    },
    {
        pergunta: "Você gosta de trabalhar com metodologias ágeis para desenvolvimento rápido ou prefere seguir modelos tradicionais?",
        opcoes: ["Metodologias Ágeis", "Modelos Tradicionais"]
    },
    {
        pergunta: "Você prefere criar protótipos e wireframes ou desenvolver a lógica e a arquitetura de sistemas?",
        opcoes: ["Protótipos e Wireframes", "Lógica e Arquitetura de Sistemas"]
    },
    {
        pergunta: "Você gosta de analisar riscos de segurança ou de desenhar interfaces de usuário intuitivas?",
        opcoes: ["Análise de Riscos de Segurança", "Desenho de Interfaces"]
    },
    {
        pergunta: "Você prefere trabalhar com hardware e redes ou focar em software e aplicações?",
        opcoes: ["Hardware e Redes", "Software e Aplicações"]
    }
];


// Índice da pergunta atual
let indicePerguntaAtual = 0;
// Armazena as respostas do usuário
let respostasUsuario = [];

// Seleção dos elementos do modal de confirmação
const modalConfirmacao = document.getElementById('modal-confirmacao');
const btnConfirmarSair = document.getElementById('btn-confirmar-sair');
const btnCancelarSair = document.getElementById('btn-cancelar-sair');

let quizIniciado = false; // Controle para verificar se o quiz está em andamento
let navigationHref = "index.html"; // Link padrão para redirecionamento

// Função para iniciar o quiz
startBtn.addEventListener('click', () => {
    startQuizSection.classList.add('oculto');
    quizQuestionsSection.classList.remove('oculto');
    document.querySelector('.progress-bar-container').classList.remove('oculto');
    carregarPergunta();
    quizIniciado = true; // Marca que o quiz foi iniciado
});

// Função para exibir o modal de confirmação ao tentar sair
function mostrarModalConfirmacao() {
    modalConfirmacao.classList.remove('oculto');
}

// Função para esconder o modal de confirmação
function esconderModalConfirmacao() {
    modalConfirmacao.classList.add('oculto');
}

// Adiciona um evento de clique para confirmar a saída
btnConfirmarSair.addEventListener('click', () => {
    esconderModalConfirmacao();
    window.location.href = navigationHref; // Redireciona para o link armazenado
});

// Adiciona um evento de clique para cancelar a saída
btnCancelarSair.addEventListener('click', esconderModalConfirmacao);

// Função para fechar o quiz sem mostrar o modal de confirmação
function fecharQuiz() {
    // Reseta as variáveis de controle
    indicePerguntaAtual = 0;
    respostasUsuario = [];
    quizIniciado = false; // Marca que o quiz foi fechado

    // Reseta o estilo da barra de progresso
    progressBarFill.style.width = '0%';
    progressBarFill.style.backgroundColor = '#3498db'; // Volta à cor padrão

    // Oculta o resultado final e volta para a tela inicial
    quizQuestionsSection.classList.remove('resultado-final');
    quizQuestionsSection.classList.add('oculto');
    startQuizSection.classList.remove('oculto');

    // Oculta a barra de progresso
    document.querySelector('.progress-bar-container').classList.add('oculto');

    // Oculta o botão de download novamente
    downloadBtn.classList.add('oculto');
}

// Adiciona a verificação antes de sair da página (ao clicar em links)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (quizIniciado) {
            e.preventDefault(); // Evita a navegação imediata

            // Verifica se o usuário clicou no link "Sobre"
            if (link.getAttribute('href') === "sobre.html") {
                navigationHref = "sobre.html";
            } else {
                navigationHref = "index.html";
            }

            mostrarModalConfirmacao(); // Exibe o modal de confirmação apenas se o quiz estiver aberto
        }
    });
});


// Botão "Começar Quiz" com ícone
startBtn.innerHTML = `<i class="fas fa-play"></i> Começar Quiz`; // Ícone de "play"

// Ajuste no botão "Próxima" para incluir ícone de seta
nextBtn.innerHTML = `<b>Próxima</b>  <i class="fas fa-arrow-right"></i>`; // Ícone de seta para a direita

const prevBtn = document.getElementById('prev-btn'); // Seleção do botão "Voltar"


// Função para carregar uma pergunta
function carregarPergunta() {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    questionContainer.innerHTML = `
        <h2><i class="fas fa-question-circle"></i> ${perguntaAtual.pergunta}</h2> <!-- Ícone de pergunta -->
        <ul class="opcoes">
            ${perguntaAtual.opcoes.map((opcao, index) => `
                <li class="opcao" data-index="${index}">
                    <i class="far fa-circle"></i> ${opcao} <!-- Novo ícone padrão para opções -->
                </li>
            `).join('')}
        </ul>
    `;

    // Exibe o botão "Voltar" se não estiver na primeira pergunta
    if (indicePerguntaAtual > 0) {
        prevBtn.classList.remove('oculto'); // Exibe o botão "Voltar"
    } else {
        prevBtn.classList.add('oculto'); // Oculta o botão "Voltar" se estiver na primeira pergunta
    }

    // Atualiza a barra de progresso
    atualizarBarraDeProgresso();

    // Adiciona evento de clique para cada opção
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => {
        opcao.addEventListener('click', () => {
            selecionarResposta(opcao);
        });
    });

    nextBtn.classList.add('oculto');
}


// Evento para retroceder para a pergunta anterior
prevBtn.addEventListener('click', () => {
    if (indicePerguntaAtual > 0) {
        indicePerguntaAtual--;
        carregarPergunta();
    }
});


// Função para selecionar uma resposta
function selecionarResposta(opcaoSelecionada) {
    // Remove a classe 'selecionada' de qualquer outra opção selecionada e restaura o ícone
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => {
        opcao.classList.remove('selecionada');
        const icone = opcao.querySelector('i');
        if (icone) icone.className = 'far fa-circle'; // Ícone padrão quando não selecionado
    });

    // Adiciona a classe 'selecionada' à opção escolhida e troca o ícone
    opcaoSelecionada.classList.add('selecionada');
    const iconeSelecionado = opcaoSelecionada.querySelector('i');
    if (iconeSelecionado) iconeSelecionado.className = 'fas fa-dot-circle'; // Ícone quando selecionado

    // Armazena a resposta do usuário
    respostasUsuario[indicePerguntaAtual] = opcaoSelecionada.dataset.index;

    // Exibe o botão "Próxima"
    nextBtn.classList.remove('oculto');
}


// Evento para avançar para a próxima pergunta
nextBtn.addEventListener('click', () => {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        calcularResultado(); // Calcula o resultado quando o quiz é concluído
        mudarCorBarraFinal(); // Muda a cor da barra ao finalizar o quiz

        // Oculta o botão "Voltar" ao exibir o resultado final
        prevBtn.classList.add('oculto');
    }
});

// Função para mudar a cor da barra ao finalizar o quiz
function mudarCorBarraFinal() {
    progressBarFill.style.backgroundColor = '#2ecc71'; // Cor verde para indicar finalização
}



// Função para calcular o resultado final do quiz
function calcularResultado() {
    // Pontuações para cada área de TI
    let contadorResultados = {
        "Desenvolvimento Front-End": 0,
        "Desenvolvimento Back-End": 0,
        "Data Science": 0,
        "Segurança da Informação": 0,
        "DevOps": 0,
        "UI/UX Design": 0,
        "Gestão de Projetos": 0,
        "Cibersegurança": 0
    };

    // Analisando as respostas
    respostasUsuario.forEach((resposta, index) => {
        switch(index) {
            case 0: // Análise de dados ou interfaces visuais
                if (resposta === "0") contadorResultados["Data Science"]++;
                else if (resposta === "1") contadorResultados["Desenvolvimento Front-End"]++;
                else {
                    contadorResultados["Data Science"]++;
                    contadorResultados["Desenvolvimento Front-End"]++;
                }
                break;
            case 1: // Lógica de sistemas ou experiências de usuário
                if (resposta === "0") contadorResultados["Desenvolvimento Back-End"]++;
                else contadorResultados["UI/UX Design"]++;
                break;
            case 2: // Novas tecnologias vs segurança de sistemas
                if (resposta === "0") {
                    contadorResultados["Desenvolvimento Front-End"]++;
                    contadorResultados["DevOps"]++;
                } else {
                    contadorResultados["Segurança da Informação"]++;
                    contadorResultados["Cibersegurança"]++;
                }
                break;
            case 3: // Problemas visuais vs algoritmos
                if (resposta === "0") contadorResultados["UI/UX Design"]++;
                else if (resposta === "1") contadorResultados["Desenvolvimento Back-End"]++;
                else {
                    contadorResultados["UI/UX Design"]++;
                    contadorResultados["Desenvolvimento Back-End"]++;
                }
                break;
            case 4: // Volumes de dados vs aplicações web
                if (resposta === "0") contadorResultados["Data Science"]++;
                else contadorResultados["Desenvolvimento Front-End"]++;
                break;
            case 5: // Backend complexo vs protótipos visuais
                if (resposta === "0") contadorResultados["Desenvolvimento Back-End"]++;
                else contadorResultados["UI/UX Design"]++;
                break;
            case 6: // Proteção de sistemas vs design inovador
                if (resposta === "0") {
                    contadorResultados["Segurança da Informação"]++;
                    contadorResultados["Cibersegurança"]++;
                } else {
                    contadorResultados["UI/UX Design"]++;
                }
                break;
            case 7: // Soluções rápidas vs projetos estruturados
                if (resposta === "0") contadorResultados["DevOps"]++;
                else contadorResultados["Gestão de Projetos"]++;
                break;
            case 8: // Funcionalidades visuais vs scripts
                if (resposta === "0") contadorResultados["Desenvolvimento Front-End"]++;
                else contadorResultados["Desenvolvimento Back-End"]++;
                break;
            case 9: // Liderança vs desenvolvimento técnico
                if (resposta === "0") contadorResultados["Gestão de Projetos"]++;
                else {
                    contadorResultados["Desenvolvimento Back-End"]++;
                    contadorResultados["Desenvolvimento Front-End"]++;
                }
                break;
            case 10: // Dinâmico vs organizado
                if (resposta === "0") contadorResultados["DevOps"]++;
                else contadorResultados["Gestão de Projetos"]++;
                break;
            case 11: // Vulnerabilidades vs novas funcionalidades
                if (resposta === "0") contadorResultados["Cibersegurança"]++;
                else contadorResultados["Desenvolvimento Front-End"]++;
                break;
            case 12: // Equipe vs individual
                if (resposta === "0") {
                    contadorResultados["Gestão de Projetos"]++;
                    contadorResultados["DevOps"]++;
                } else {
                    contadorResultados["Desenvolvimento Back-End"]++;
                }
                break;
            case 13: // Backend vs design de interface
                if (resposta === "0") contadorResultados["Desenvolvimento Back-End"]++;
                else contadorResultados["UI/UX Design"]++;
                break;
            case 14: // Infraestrutura vs interfaces amigáveis
                if (resposta === "0") {
                    contadorResultados["DevOps"]++;
                    contadorResultados["Segurança da Informação"]++;
                } else if (resposta === "1") contadorResultados["Desenvolvimento Front-End"]++;
                else {
                    contadorResultados["Segurança da Informação"]++;
                    contadorResultados["Desenvolvimento Front-End"]++;
                }
                break;
            case 15: // Segurança vs funcionalidades interativas
                if (resposta === "0") contadorResultados["Segurança da Informação"]++;
                else contadorResultados["Desenvolvimento Front-End"]++;
                break;
            case 16: // Dados vs lógica de aplicações
                if (resposta === "0") contadorResultados["Data Science"]++;
                else contadorResultados["Desenvolvimento Back-End"]++;
                break;
            case 17: // Design visual vs infraestrutura
                if (resposta === "0") contadorResultados["UI/UX Design"]++;
                else contadorResultados["DevOps"]++;
                break;
            case 18: // Do zero vs melhorar sistemas
                if (resposta === "0") {
                    contadorResultados["Desenvolvimento Front-End"]++;
                    contadorResultados["Desenvolvimento Back-End"]++;
                } else if (resposta === "1") contadorResultados["DevOps"]++;
                else {
                    contadorResultados["Desenvolvimento Front-End"]++;
                    contadorResultados["Desenvolvimento Back-End"]++;
                }
                break;
            case 19: // Documentação vs criação de código
                if (resposta === "0") contadorResultados["Gestão de Projetos"]++;
                else {
                    contadorResultados["Desenvolvimento Back-End"]++;
                    contadorResultados["Desenvolvimento Front-End"]++;
                }
                break;
            case 20: // IA e ML vs interfaces responsivas
                if (resposta === "0") contadorResultados["Data Science"]++;
                else contadorResultados["Desenvolvimento Front-End"]++;
                break;
            case 21: // Ágil vs tradicional
                if (resposta === "0") contadorResultados["DevOps"]++;
                else contadorResultados["Gestão de Projetos"]++;
                break;
            case 22: // Protótipos vs lógica de sistemas
                if (resposta === "0") contadorResultados["UI/UX Design"]++;
                else contadorResultados["Desenvolvimento Back-End"]++;
                break;
            case 23: // Riscos de segurança vs desenho de interfaces
                if (resposta === "0") contadorResultados["Cibersegurança"]++;
                else contadorResultados["UI/UX Design"]++;
                break;
            case 24: // Hardware e redes vs software e aplicações
                if (resposta === "0") contadorResultados["Segurança da Informação"]++;
                else contadorResultados["Desenvolvimento Front-End"]++;
                break;
        }
    });

    // Determina a área com mais pontos
    const areaEscolhida = Object.keys(contadorResultados).reduce((a, b) => 
        contadorResultados[a] > contadorResultados[b] ? a : b
    );

    // Verifica se Front-End e Back-End têm pontuações equilibradas para sugerir Fullstack
    const diferencaFB = Math.abs(contadorResultados["Desenvolvimento Front-End"] - contadorResultados["Desenvolvimento Back-End"]);
    const isFullstackSuggestion = diferencaFB <= 2 && (contadorResultados["Desenvolvimento Front-End"] > 0 || contadorResultados["Desenvolvimento Back-End"] > 0);

    // Exibe o resultado final
    exibirResultado(areaEscolhida, isFullstackSuggestion);
}


// Função para exibir o resultado final ao usuário
function exibirResultado(areaEscolhida, isFullstackSuggestion) {
    const descricoes = {
        "Desenvolvimento Front-End": {
            descricao: "O desenvolvimento Front-End foca na criação de interfaces e experiências de usuário para websites e aplicativos. É uma área ideal para quem gosta de trabalhar com HTML, CSS e JavaScript para criar layouts e interações visuais.",
            linkEstudo: "https://roadmap.sh/frontend",
            icone: "fas fa-laptop-code" // Ícone específico para a área
        },
        "Desenvolvimento Back-End": {
            descricao: "O desenvolvimento Back-End envolve a construção da lógica e funcionamento interno de sistemas. É ideal para quem gosta de trabalhar com linguagens de programação server-side e bancos de dados.",
            linkEstudo: "https://roadmap.sh/backend",
            icone: "fas fa-server"
        },
        "Data Science": {
            descricao: "Data Science é o campo que envolve análise de dados, estatísticas e machine learning para obter insights significativos. É ideal para quem gosta de trabalhar com dados e encontrar padrões.",
            linkEstudo: "https://www.kaggle.com/learn",
            icone: "fas fa-chart-line"
        },
        "Segurança da Informação": {
            descricao: "Segurança da Informação envolve proteger sistemas, redes e dados contra ameaças digitais. É uma área ideal para quem gosta de identificar vulnerabilidades e implementar medidas de segurança.",
            linkEstudo: "https://www.cybrary.it/",
            icone: "fas fa-shield-alt"
        },
        "DevOps": {
            descricao: "DevOps é a prática de integrar desenvolvimento e operações para melhorar a eficiência e a qualidade de software. Envolve automação, integração contínua e gerenciamento de infraestrutura.",
            linkEstudo: "https://roadmap.sh/devops",
            icone: "fas fa-tools"
        },
        "UI/UX Design": {
            descricao: "UI/UX Design foca na criação de interfaces de usuário agradáveis e funcionais. É ideal para quem gosta de entender o comportamento do usuário e criar designs visuais atraentes.",
            linkEstudo: "https://roadmap.sh/ux-design",
            icone: "fas fa-pencil-ruler"
        },
        "Gestão de Projetos": {
            descricao: "Gestão de Projetos envolve coordenar equipes, prazos e recursos para atingir objetivos específicos. É ideal para quem gosta de planejar, organizar e liderar projetos complexos.",
            linkEstudo: "https://www.scrum.org/",
            icone: "fas fa-project-diagram"
        },
        "Cibersegurança": {
            descricao: "Cibersegurança envolve a proteção de sistemas e redes contra ameaças digitais. É ideal para quem gosta de trabalhar com segurança de dados, análise de vulnerabilidades e proteção de informações críticas.",
            linkEstudo: "https://roadmap.sh/cyber-security",
            icone: "fas fa-lock"
        }
    };

    const resultado = descricoes[areaEscolhida];

    // Adiciona a classe "fade-in" para animação suave
    questionContainer.innerHTML = `
        <div class="resultado-container fade-in">
            <h2>
                <i class="${resultado.icone}"></i> Área Recomendada: ${areaEscolhida}
            </h2>
            <p>${resultado.descricao}</p>
    `;

    // Adiciona sugestão de Fullstack caso seja relevante
    if (isFullstackSuggestion && (areaEscolhida === "Desenvolvimento Front-End" || areaEscolhida === "Desenvolvimento Back-End")) {
        questionContainer.innerHTML += `
            <p class="sugestao-fullstack"><strong><i class="fas fa-info-circle"></i> Sugestão:</strong> Baseado nas suas respostas, você parece ter um interesse equilibrado entre Front-End e Back-End. Considere explorar a área de Desenvolvimento Fullstack, que abrange ambas as competências!</p>
        `;
    }
    

    questionContainer.innerHTML += `
            <a href="${resultado.linkEstudo}" target="_blank" class="botao-estudo">Explorar Recursos</a>
            <button id="reiniciar-btn" class="botao-reiniciar"><i class="fas fa-redo"></i> Reiniciar Quiz</button>
        </div>
    `;

    nextBtn.classList.add('oculto');
    quizQuestionsSection.classList.add('resultado-final');

    // Exibe o botão de download somente ao final do quiz com animação suave
    downloadBtn.classList.add('fade-in');
    downloadBtn.classList.remove('oculto');

    // Animação de aparição para o resultado e botão de download
    setTimeout(() => {
        const resultadoContainer = document.querySelector('.resultado-container');
        if (resultadoContainer) resultadoContainer.classList.add('aparecer');
        downloadBtn.classList.add('aparecer');
    }, 100); // Pequeno atraso para ativar a animação

    // Exibe o "X" ao final do quiz
    const fecharQuizBtn = document.getElementById('fecharQuiz');
    if (fecharQuizBtn) {
        fecharQuizBtn.classList.remove('oculto');
    }

    // Guarda o resultado final para o relatório
    window.resultadoFinal = areaEscolhida;

    // Adiciona evento para o botão de reiniciar
    document.getElementById('reiniciar-btn').addEventListener('click', reiniciarQuiz);

    // Adiciona evento para o botão de fechar
    if (fecharQuizBtn) {
        fecharQuizBtn.addEventListener('click', voltarParaTelaInicial);
    }
}


// Função para reiniciar o quiz e voltar à primeira pergunta

function reiniciarQuiz() {
    // Reseta as variáveis de controle
    indicePerguntaAtual = 0;
    respostasUsuario = [];

    // Reseta o estilo da barra de progresso
    progressBarFill.style.width = '0%';
    progressBarFill.style.backgroundColor = '#3498db'; // Volta à cor padrão

    // Oculta o botão de download novamente
    downloadBtn.classList.add('oculto');

    // Oculta o resultado final e exibe a seção de perguntas
    quizQuestionsSection.classList.remove('resultado-final');

    // Recarrega a primeira pergunta do quiz
    carregarPergunta();
}


// Função para voltar à tela inicial do quiz com confirmação
function voltarParaTelaInicial() {
    // Alerta de confirmação antes de fechar o quiz
    const confirmarFechamento = confirm("Tem certeza que deseja fechar o quiz?");

    if (confirmarFechamento) {
        // Reseta as variáveis de controle
        indicePerguntaAtual = 0;
        respostasUsuario = [];
        quizIniciado = false; // Marca que o quiz foi fechado

        // Reseta o estilo da barra de progresso
        progressBarFill.style.width = '0%';
        progressBarFill.style.backgroundColor = '#3498db'; // Volta à cor padrão

        // Oculta o resultado final e volta para a tela inicial
        quizQuestionsSection.classList.remove('resultado-final');
        quizQuestionsSection.classList.add('oculto');
        startQuizSection.classList.remove('oculto');

        // Oculta a barra de progresso
        document.querySelector('.progress-bar-container').classList.add('oculto');

        // Oculta o botão de download novamente
        downloadBtn.classList.add('oculto');

        // Oculta o botão "X" quando voltar para a tela inicial
        const fecharQuizBtn = document.getElementById('fecharQuiz');
        if (fecharQuizBtn) {
            fecharQuizBtn.classList.add('oculto');
        }
    } else {
        // Se o usuário clicar em "Cancelar", o quiz não deve ser fechado
        return; // Sai da função sem fazer nada
    }
}

// Adiciona evento para o botão de fechar com confirmação
const fecharQuizBtn = document.getElementById('fecharQuiz');
if (fecharQuizBtn) {
    fecharQuizBtn.addEventListener('click', voltarParaTelaInicial);
}



// Função para atualizar apenas a barra de progresso
function atualizarBarraDeProgresso() {
    const progresso = ((indicePerguntaAtual + 1) / perguntas.length) * 100;
    progressBarFill.style.width = `${progresso}%`;
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarBarraDeProgresso(); // Atualiza a barra e o contador assim que a página carrega
});

// Função para abrir o modal quando o botão de download for clicado
downloadBtn.addEventListener('click', () => {
    modal.classList.remove('oculto'); // Remove a classe "oculto" para exibir o modal
});

// Função para fechar o modal ao clicar no "X"
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('oculto'); // Adiciona a classe "oculto" para ocultar o modal
});


// Função para abrir o modal quando o botão de download for clicado
downloadBtn.addEventListener('click', () => {
    modal.classList.remove('oculto');
});

// Função para fechar o modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('oculto');
});

// Função para validar o nome e baixar o relatório
confirmDownloadBtn.addEventListener('click', () => {
    const userName = userNameInput.value.trim();

    if (userName !== '') {
        baixarRelatorio(userName);
        modal.classList.add('oculto');
    } else {
        alert('Por favor, preencha seu nome antes de baixar o relatório.');
    }
});

// Função para baixar o relatório
function baixarRelatorio(userName) {
    const resultadoEscolhido = window.resultadoFinal || 'Não disponível'; // Captura o resultado final
    const dataAtual = new Date().toLocaleDateString(); // Obtém a data atual formatada

// Dados adicionais sobre cada área
const descricoes = {
    "Desenvolvimento Front-End": {
        descricao: "O desenvolvimento Front-End foca na criação de interfaces de usuário e experiências visuais para sites e aplicativos, utilizando tecnologias como HTML, CSS e JavaScript.",
        dicas: [
            "Familiarize-se com HTML, CSS e JavaScript.",
            "Pratique criando sites responsivos.",
            "Explore frameworks populares como React ou Vue.js."
        ],
        recursos: [
            "https://www.youtube.com/watch?v=Ejkb_YpuHWs&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n",
            "https://react.dev/",
            "https://www.w3schools.com/"
        ]
    },
    "Desenvolvimento Back-End": {
        descricao: "O desenvolvimento Back-End envolve a lógica de servidor, banco de dados e a funcionalidade interna de sistemas, utilizando linguagens server-side como Node.js, Python e PHP.",
        dicas: [
            "Aprenda sobre bancos de dados relacionais e não relacionais.",
            "Domine uma linguagem de servidor como Node.js ou Python.",
            "Pratique criando APIs RESTful."
        ],
        recursos: [
            "https://nodejs.org/en/docs/",
            "https://www.python.org/",
            "https://expressjs.com/"
        ]
    },
    "Data Science": {
        descricao: "Data Science envolve a análise de dados, estatísticas e machine learning para extrair insights e informações valiosas.",
        dicas: [
            "Aprofunde-se em Python e bibliotecas como Pandas e NumPy.",
            "Aprenda conceitos básicos de estatística.",
            "Explore ferramentas de visualização de dados como Matplotlib."
        ],
        recursos: [
            "https://www.kaggle.com/learn",
            "https://scikit-learn.org/",
            "https://towardsdatascience.com/"
        ]
    },
    "Segurança da Informação": {
        descricao: "Segurança da Informação foca em proteger sistemas, redes e dados contra ameaças e vulnerabilidades digitais.",
        dicas: [
            "Aprenda sobre criptografia e segurança de redes.",
            "Explore ferramentas de pentest como Kali Linux.",
            "Domine conceitos de segurança em cloud computing."
        ],
        recursos: [
            "https://www.cybrary.it/",
            "https://www.offensive-security.com/",
            "https://www.udemy.com/topic/cyber-security/"
        ]
    },
    "DevOps": {
        descricao: "DevOps integra desenvolvimento e operações para melhorar a eficiência de software, usando automação e integração contínua.",
        dicas: [
            "Familiarize-se com CI/CD e ferramentas como Jenkins.",
            "Aprenda sobre containers e Docker.",
            "Explore ferramentas de gerenciamento de infraestrutura como Terraform."
        ],
        recursos: [
            "https://aws.amazon.com/devops/what-is-devops/",
            "https://www.docker.com/",
            "https://www.terraform.io/"
        ]
    },
    "UI/UX Design": {
        descricao: "UI/UX Design envolve criar interfaces de usuário que são visualmente atraentes e fáceis de usar, baseadas no comportamento do usuário.",
        dicas: [
            "Aprenda sobre design de interface com Figma ou Adobe XD.",
            "Estude princípios de usabilidade e design centrado no usuário.",
            "Pratique criando protótipos de interfaces interativas."
        ],
        recursos: [
            "https://www.interaction-design.org/",
            "https://www.behance.net/",
            "https://dribbble.com/"
        ]
    },
    "Gestão de Projetos": {
        descricao: "Gestão de Projetos envolve coordenar equipes, recursos e prazos para atingir objetivos específicos, utilizando metodologias como Scrum e Agile.",
        dicas: [
            "Aprenda sobre metodologias ágeis como Scrum.",
            "Domine ferramentas de gestão como Trello ou Jira.",
            "Pratique comunicação e liderança de equipe."
        ],
        recursos: [
            "https://www.scrum.org/",
            "https://www.atlassian.com/software/jira",
            "https://www.coursera.org/browse/business/leadership-and-management"
        ]
    },
    "Cibersegurança": {
        descricao: "Cibersegurança envolve proteger sistemas, redes e dados contra ataques e ameaças digitais. É uma área para quem deseja entender vulnerabilidades e fortalecer defesas digitais.",
        dicas: [
            "Aprenda sobre técnicas de análise de vulnerabilidades.",
            "Explore frameworks de segurança como OWASP.",
            "Familiarize-se com práticas de segurança em ambientes de cloud computing."
        ],
        recursos: [
            "https://www.cybrary.it/",
            "https://owasp.org/",
            "https://www.comptia.org/"
        ]
    }
};

    const infoArea = descricoes[resultadoEscolhido] || {
        descricao: "Informações detalhadas não disponíveis para esta área.",
        dicas: ["Explore mais recursos online sobre esta área."],
        recursos: ["https://www.google.com"]
    };

    // Criação do conteúdo do relatório
    const content = `
===== TechQuiz - Relatório de Resultado =====

  Nome do Usuário: ${userName}
  Data do Teste: ${dataAtual}
    
  Área Recomendada: ${resultadoEscolhido}\n 
  Descrição da Área:
  ${infoArea.descricao}

  Dicas para Começar:
    - ${infoArea.dicas.join('\n    - ')}

  Recursos Recomendados para Estudo:
    - ${infoArea.recursos.join('\n    - ')}

====================================
😁👋 Obrigado por usar o TechQuiz! Continue explorando e aprimorando suas habilidades para alcançar o sucesso na área escolhida!
====================================
    `;

    // Geração do arquivo de relatório
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Resultado_TechQuiz_${userName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Função para mostrar o container com animação
function mostrarContainer() {
    const container = document.querySelector('.container');
    container.classList.add('mostrar');
}

// Chama a função para mostrar o container ao carregar a página
document.addEventListener('DOMContentLoaded', mostrarContainer);