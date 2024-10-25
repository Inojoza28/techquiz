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
        pergunta: "Você prefere trabalhar em equipe ou sozinho?",
        opcoes: ["Em Equipe", "Sozinho"]
    },
    {
        pergunta: "Você gosta de tarefas que envolvem criatividade ou prefere algo mais técnico e detalhado?",
        opcoes: ["Criativo", "Técnico"]
    },
    // {
    //     pergunta: "Você prefere aprender novas tecnologias ou aperfeiçoar habilidades em uma tecnologia específica?",
    //     opcoes: ["Novas Tecnologias", "Aperfeiçoar Habilidades"]
    // },
    // {
    //     pergunta: "Você se sente mais confortável resolvendo problemas visuais ou solucionando problemas lógicos complexos?",
    //     opcoes: ["Problemas Visuais", "Problemas Lógicos"]
    // },
    // {
    //     pergunta: "Você se interessa mais por entender o comportamento do usuário ou por otimizar o desempenho de sistemas?",
    //     opcoes: ["Comportamento do Usuário", "Desempenho de Sistemas"]
    // },
    // {
    //     pergunta: "Você prefere explorar grandes quantidades de dados ou criar interfaces que interajam com o usuário?",
    //     opcoes: ["Analisar Dados", "Criar Interfaces"]
    // },
    // {
    //     pergunta: "Você se interessa por explorar tecnologias emergentes ou prefere manter-se em áreas consolidadas?",
    //     opcoes: ["Tecnologias Emergentes", "Áreas Consolidadas"]
    // },
    // {
    //     pergunta: "Você gosta de planejar projetos a longo prazo ou prefere tarefas rápidas e de curto prazo?",
    //     opcoes: ["Projetos a Longo Prazo", "Tarefas de Curto Prazo"]
    // },
    // {
    //     pergunta: "Você prefere desenvolver soluções que melhorem a segurança de um sistema ou criar novas funcionalidades?",
    //     opcoes: ["Segurança de Sistemas", "Novas Funcionalidades"]
    // },
    // {
    //     pergunta: "Você se sente mais realizado ao entender como algo funciona ou ao criar algo do zero?",
    //     opcoes: ["Entender Como Funciona", "Criar Algo do Zero"]
    // },
    // {
    //     pergunta: "Você prefere ambientes de trabalho dinâmicos e rápidos ou metódicos e estruturados?",
    //     opcoes: ["Dinâmico e Rápido", "Metódico e Estruturado"]
    // },
    // {
    //     pergunta: "Você gosta de explorar ferramentas visuais ou prefere utilizar ferramentas de automação e scripts?",
    //     opcoes: ["Ferramentas Visuais", "Ferramentas de Automação"]
    // },
    // {
    //     pergunta: "Você prefere entender a infraestrutura de redes ou explorar novas maneiras de melhorar a experiência do usuário?",
    //     opcoes: ["Infraestrutura de Redes", "Experiência do Usuário"]
    // },
    // {
    //     pergunta: "Você prefere criar protótipos visuais ou desenvolver a lógica por trás de uma aplicação?",
    //     opcoes: ["Criar Protótipos Visuais", "Desenvolver Lógica"]
    // },
    // {
    //     pergunta: "Você gosta de lidar com dados quantitativos ou preferiria trabalhar com interfaces e interações?",
    //     opcoes: ["Dados Quantitativos", "Interfaces e Interações"]
    // },
    // {
    //     pergunta: "Você prefere trabalhar com algo mais visual e artístico ou com sistemas complexos e detalhados?",
    //     opcoes: ["Visual e Artístico", "Sistemas Complexos"]
    // },
    // {
    //     pergunta: "Você se interessa por explorar vulnerabilidades de sistemas ou por desenhar e criar novas interfaces?",
    //     opcoes: ["Explorar Vulnerabilidades", "Desenhar Interfaces"]
    // },
    // {
    //     pergunta: "Você prefere utilizar metodologias ágeis para desenvolvimento rápido ou modelos tradicionais para projetos mais estruturados?",
    //     opcoes: ["Metodologias Ágeis", "Modelos Tradicionais"]
    // },
    // {
    //     pergunta: "Você gosta de analisar tendências e padrões ou prefere desenvolver soluções para problemas específicos?",
    //     opcoes: ["Analisar Tendências", "Desenvolver Soluções"]
    // },
    {
        pergunta: "Você prefere lidar com hardware e redes ou se concentrar em software e aplicações?",
        opcoes: ["Hardware e Redes", "Software e Aplicações"]
    }
];


// Índice da pergunta atual
let indicePerguntaAtual = 0;
// Armazena as respostas do usuário
let respostasUsuario = [];

// Função para iniciar o quiz
startBtn.addEventListener('click', () => {
    startQuizSection.classList.add('oculto'); // Oculta a seção de início
    quizQuestionsSection.classList.remove('oculto'); // Exibe as perguntas
    document.querySelector('.progress-bar-container').classList.remove('oculto'); // Exibe a barra de progresso
    carregarPergunta(); // Carrega a primeira pergunta
});

// Botão "Começar Quiz" com ícone
startBtn.innerHTML = `<i class="fas fa-play"></i> Começar Quiz`; // Ícone de "play"

// Ajuste no botão "Próxima" para incluir ícone de seta
nextBtn.innerHTML = `<i class="fas fa-arrow-right"></i> Próxima`; // Ícone de seta para a direita



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
        "Gestão de Projetos": 0
    };

    // Analisando as respostas
    respostasUsuario.forEach((resposta, index) => {
        const pergunta = perguntas[index];

        // Lógica de pontuação baseada nas respostas
        if (index === 0) { // Pergunta sobre trabalho em equipe ou sozinho
            if (resposta === "0") contadorResultados["Gestão de Projetos"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 1) { // Criatividade vs Técnico
            if (resposta === "0") contadorResultados["UI/UX Design"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 2) { // Novas tecnologias vs Aperfeiçoar habilidades
            if (resposta === "0") contadorResultados["Desenvolvimento Front-End"]++;
            else contadorResultados["Segurança da Informação"]++;
        } else if (index === 3) { // Problemas visuais vs lógicos
            if (resposta === "0") contadorResultados["UI/UX Design"]++;
            else contadorResultados["Data Science"]++;
        } else if (index === 4) { // Comportamento do usuário vs desempenho de sistemas
            if (resposta === "0") contadorResultados["Desenvolvimento Front-End"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 5) { // Dados vs Interfaces
            if (resposta === "0") contadorResultados["Data Science"]++;
            else contadorResultados["Desenvolvimento Front-End"]++;
        } else if (index === 6) { // Tecnologias emergentes vs áreas consolidadas
            if (resposta === "0") contadorResultados["DevOps"]++;
            else contadorResultados["Segurança da Informação"]++;
        } else if (index === 7) { // Longo prazo vs curto prazo
            if (resposta === "0") contadorResultados["Gestão de Projetos"]++;
            else contadorResultados["UI/UX Design"]++;
        } else if (index === 8) { // Segurança de sistemas vs novas funcionalidades
            if (resposta === "0") contadorResultados["Segurança da Informação"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 9) { // Entender como funciona vs criar do zero
            if (resposta === "0") contadorResultados["Data Science"]++;
            else contadorResultados["Desenvolvimento Front-End"]++;
        } else if (index === 10) { // Dinâmico vs estruturado
            if (resposta === "0") contadorResultados["DevOps"]++;
            else contadorResultados["Gestão de Projetos"]++;
        } else if (index === 11) { // Ferramentas visuais vs automação
            if (resposta === "0") contadorResultados["UI/UX Design"]++;
            else contadorResultados["DevOps"]++;
        } else if (index === 12) { // Infraestrutura de redes vs experiência do usuário
            if (resposta === "0") contadorResultados["Segurança da Informação"]++;
            else contadorResultados["Desenvolvimento Front-End"]++;
        } else if (index === 13) { // Criar protótipos visuais vs desenvolver lógica
            if (resposta === "0") contadorResultados["UI/UX Design"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 14) { // Dados quantitativos vs interfaces
            if (resposta === "0") contadorResultados["Data Science"]++;
            else contadorResultados["Desenvolvimento Front-End"]++;
        } else if (index === 15) { // Visual e artístico vs sistemas complexos
            if (resposta === "0") contadorResultados["UI/UX Design"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 16) { // Vulnerabilidades de sistemas vs desenhar interfaces
            if (resposta === "0") contadorResultados["Segurança da Informação"]++;
            else contadorResultados["UI/UX Design"]++;
        } else if (index === 17) { // Ágil vs tradicional
            if (resposta === "0") contadorResultados["DevOps"]++;
            else contadorResultados["Gestão de Projetos"]++;
        } else if (index === 18) { // Tendências e padrões vs soluções específicas
            if (resposta === "0") contadorResultados["Data Science"]++;
            else contadorResultados["Desenvolvimento Back-End"]++;
        } else if (index === 19) { // Hardware e redes vs software e aplicações
            if (resposta === "0") contadorResultados["Segurança da Informação"]++;
            else contadorResultados["Desenvolvimento Front-End"]++;
        }
    });

    // Determina a área com mais pontos
    const areaEscolhida = Object.keys(contadorResultados).reduce((a, b) => 
        contadorResultados[a] > contadorResultados[b] ? a : b
    );

    // Exibe o resultado final
    exibirResultado(areaEscolhida);
}



// Função para exibir o resultado final ao usuário
// Função para exibir o resultado final ao usuário
function exibirResultado(areaEscolhida) {
    const descricoes = {
        "Desenvolvimento Front-End": {
            descricao: "O desenvolvimento Front-End foca na criação de interfaces e experiências de usuário para websites e aplicativos. É uma área ideal para quem gosta de trabalhar com HTML, CSS e JavaScript para criar layouts e interações visuais.",
            linkEstudo: "https://developer.mozilla.org/pt-BR/docs/Web/Guide/Front-End",
            icone: "fas fa-laptop-code" // Ícone específico para a área
        },
        "Desenvolvimento Back-End": {
            descricao: "O desenvolvimento Back-End envolve a construção da lógica e funcionamento interno de sistemas. É ideal para quem gosta de trabalhar com linguagens de programação server-side e bancos de dados.",
            linkEstudo: "https://nodejs.org/en/docs/",
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
            linkEstudo: "https://aws.amazon.com/devops/what-is-devops/",
            icone: "fas fa-tools"
        },
        "UI/UX Design": {
            descricao: "UI/UX Design foca na criação de interfaces de usuário agradáveis e funcionais. É ideal para quem gosta de entender o comportamento do usuário e criar designs visuais atraentes.",
            linkEstudo: "https://www.interaction-design.org/",
            icone: "fas fa-pencil-ruler"
        },
        "Gestão de Projetos": {
            descricao: "Gestão de Projetos envolve coordenar equipes, prazos e recursos para atingir objetivos específicos. É ideal para quem gosta de planejar, organizar e liderar projetos complexos.",
            linkEstudo: "https://www.scrum.org/",
            icone: "fas fa-project-diagram"
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

        // Reseta o estilo da barra de progresso
        progressBarFill.style.width = '0%';
        progressBarFill.style.backgroundColor = '#3498db'; // Volta à cor padrão

        // Oculta o resultado final e volta para a tela inicial
        quizQuestionsSection.classList.remove('resultado-final');
        quizQuestionsSection.classList.add('oculto');
        startQuizSection.classList.remove('oculto');

        // Oculta a barra de progresso
        document.querySelector('.progress-bar-container').classList.add('oculto');

        // Oculta o "X" somente ao voltar para a tela inicial
        const fecharQuizBtn = document.getElementById('fecharQuiz');
        if (fecharQuizBtn) {
            fecharQuizBtn.classList.add('oculto');
        }

        // Oculta o botão de download novamente
        downloadBtn.classList.add('oculto');
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
    const content = `Relatório de Resultado - ${userName}\n\nObrigado por usar o TechQuiz!\nSua área recomendada é: ${resultadoEscolhido}.\n\nContinue explorando essa área para mais oportunidades!`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Relatorio_${userName}.txt`;
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

