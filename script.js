document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos HTML ---
    const introScreen = document.getElementById('introScreen');
    const dreamBookCover = document.getElementById('dreamBookCover');
    const startJourneyButton = document.getElementById('startJourneyButton');

    const preQuizLockScreen = document.getElementById('preQuizLockScreen');
    const startQuizButton = document.getElementById('startQuizButton');
    const guardianHeartLockPreQuiz = document.getElementById('guardianHeartLockPreQuiz');

    const gameScreen = document.getElementById('gameScreen');
    const loveProgressMeter = document.getElementById('loveProgressMeter');
    const progressText = document.getElementById('progressText');
    const lifeCrystalsContainer = document.getElementById('lifeCrystalsContainer'); // Corrigido a atribuição aqui
    let lifeCrystals = lifeCrystalsContainer ? lifeCrystalsContainer.querySelectorAll('.life-crystal') : [];
    const magicalPagesWrapper = document.getElementById('magicalPagesWrapper');
    const currentPageContent = document.getElementById('currentPageContent');
    const pageInnerContent = document.getElementById('pageInnerContent');
    const magicalCompanion = document.getElementById('magicalCompanion');
    const companionSpeechBubble = document.getElementById('companionSpeechBubble');

    const postQuizLockScreen = document.getElementById('postQuizLockScreen');
    const guardianHeartLockPostQuiz = document.getElementById('guardianHeartLockPostQuiz');
    const magicKeyCharmContainer = document.getElementById('magicKeyCharmContainer');
    const magicKeyCharm = document.getElementById('magicKeyCharm');

    const photoRevealScreen = document.getElementById('photoRevealScreen');
    const photoRevealArea = document.querySelector('.photo-reveal-area');
    const secretMessagePaper = document.getElementById('secretMessagePaper');
    const paperContent = document.getElementById('paperContent');
    const closePaperButton = document.getElementById('closePaperButton');

    const sanctuaryScreen = document.getElementById('sanctuaryScreen');
    const sanctuaryTitle = document.getElementById('sanctuaryTitle');
    const sanctuaryText = document.getElementById('sanctuaryText');
    const sanctuaryGallery = document.getElementById('sanctuaryGallery');

    const heartShatterOverlay = document.getElementById('heartShatterOverlay');
    const backgroundParticles = document.querySelector('.background-particles');

    // --- Áudios ---
    const audioBookOpen = document.getElementById('audioBookOpen');
    const audioPageTurn = document.getElementById('audioPageTurn');
    const audioCorrectAnswer = document.getElementById('audioCorrectAnswer');
    const audioWrongAnswer = document.getElementById('audioWrongAnswer');
    const audioHeartShatter = document.getElementById('audioHeartShatter');
    const audioSuccessQuest = document.getElementById('audioSuccessQuest');
    const audioGameOverJingle = document.getElementById('audioGameOverJingle');
    const audioUnlockCharm = document.getElementById('audioUnlockCharm');
    const audioDiscovery = document.getElementById('audioDiscovery');
    const audioFinalMelody = document.getElementById('audioFinalMelody');
    const audioPaperOpen = document.getElementById('audioPaperOpen');
    const audioPaperClose = document.getElementById('audioPaperClose');

    // --- Configurações do Jogo ---
    let currentQuestionIndex = 0;
    let userLives = 3;
    let loveProgress = 0;
    let totalQuestions = 0;
    let gameActive = false;
    let lockUnlocked = false;

    // Estado atual do companheiro (neutro ou triste)
    let companionState = 'neutro';

    // --- Variáveis para Arrastar e Soltar ---
    let isDragging = false;
    let currentDraggable = null;
    let offsetX, offsetY;

    // --- Dados do Jogo (***PERSONALIZAR APENAS SEU NOME!!!***) ---
    const questions = [
        {
            question: "Qual o dia do meu aniversário?",
            options: ["11/08/2005", "15/05/2004", "22/03/2006"],
            correctAnswer: "11/08/2005",
            companionSpeechCorrect: "Parabéns pra mim! Você lembrou!",
            companionSpeechWrong: "Quase lá! Essa data é muito importante para mim!",
            background: "quiz_bg_birthday.jpg",
            questionImage: null
        },
        {
            question: "Onde foi tirada essa foto?",
            options: ["Na sua casa", "No shopping", "Minha casa"],
            correctAnswer: "Minha casa",
            companionSpeechCorrect: "Isso mesmo, nosso cantinho!",
            companionSpeechWrong: "Ops! Pensa no lugar mais aconchegante...",
            background: "quiz_bg_house.png",
            questionImage: "quiz_photo_house.png"
        },
        {
            question: "Quantos anos eu tenho?",
            options: ["18", "19", "20"],
            correctAnswer: "19",
            companionSpeechCorrect: "Acertou! A idade da sabedoria e do amor!",
            companionSpeechWrong: "Hmmm... acho que você esqueceu de contar!",
            background: "quiz_bg_age.jpg",
            questionImage: null
        },
        {
            question: "Qual meu nome completo?",
            options: ["Fernando Santos Costa", "Fernando Teixeira Da Silva", "Fernando Almeida Souza"],
            correctAnswer: "Fernando Teixeira Da Silva",
            companionSpeechCorrect: "Meu nome completo, você sabe tudo!",
            companionSpeechWrong: "Essa é fácil! Tenta de novo!",
            background: "quiz_bg_name.jpg",
            questionImage: null
        },
        {
            question: "Começamos a conversar por onde?",
            options: ["Facebook", "WhatsApp", "Instagram"],
            correctAnswer: "Instagram",
            companionSpeechCorrect: "Isso! Nosso primeiro contato foi mágico!",
            companionSpeechWrong: "Não foi bem por aí! Lembra daquela DM?",
            background: "quiz_bg_instagram.jpg",
            questionImage: null
        },
        {
            question: "Quem é o amor da minha vida?",
            options: ["Eduarda", "Duda", "Jumentinha", "Goulartezinha"],
            correctAnswer: ["Eduarda", "Duda", "Jumentinha", "Goulartezinha"],
            companionSpeechCorrect: "ACERTOU EM CHEIO! VOCÊ É O AMOR DA MINHA VIDA!",
            companionSpeechWrong: "Essa não deveria ser difícil! Tente de novo, meu amor!",
            background: "quiz_bg_love.jpg",
            questionImage: null
        }
    ];

    const finalPhotos = [
        "final_photo_1.png",
        "final_photo_2.png",
        "final_photo_3.png",
        "final_photo_4.png",
        "final_photo_5.png",
        "final_photo_6.png"
    ];

    const secretMessageContent = `
        <p>Meu Amor,</p>
        <p>Esta jornada foi um pequeno reflexo do nosso caminho juntos, cheio de desafios superados e momentos mágicos. Cada resposta que você acertou é uma lembrança do quão bem nos conhecemos e o quanto nossa conexão é forte.</p>
        <p>Você é a luz que guia meus passos, o sorriso que ilumina meus dias e a melodia que embala minha alma. Cada momento ao seu lado é um presente, e cada dia, uma nova aventura. Onde quer que a vida nos leve, saiba que meu coração sempre estará com você.</p>
        <p>Com todo o meu amor e a promessa de muitos mais momentos inesquecíveis,</p>
        <p>Seu eterno amor,</p>
        <p><strong>[Fernando Teixeira]</strong></p>
    `; // *** PERSONALIZAR AQUI SUA MENSAGEM SECRETA!!! ***

    const sanctuaryTitleContent = "Nosso Santuário Secreto do Amor! ✨";
    const sanctuaryPhotos = [
        "sanctuary_photo1.jpg",
        "sanctuary_photo2.jpg",
        "sanctuary_photo3.jpg",
        "sanctuary_photo4.jpg",
        "sanctuary_photo5.jpg"
    ];

    const yourName = "Fernando Teixeira"; // *** MUDE ISSO PARA O SEU NOME!!! ***

    // --- Funções Auxiliares ---

    const playAudio = (audioElement) => {
        if (audioElement) {
            audioElement.currentTime = 0;
            audioElement.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }
    };

    const stopAudio = (audioElement) => {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
    };

    const switchStage = (stageId) => {
        // Para música de fundo do jogo
        if (stageId === 'gameScreen') {
            playAudio(audioPageTurn); // Inicia a música do jogo
        } else {
            stopAudio(audioPageTurn); // Para a música do jogo se sair da tela do quiz
        }

        // Para música de fundo final
        if (stageId === 'sanctuaryScreen') {
            playAudio(audioFinalMelody); // Inicia a música final
        } else {
            stopAudio(audioFinalMelody); // Para a música final se sair da tela do santuário
        }

        document.querySelectorAll('.app-stage').forEach(stage => {
            stage.classList.remove('active');
        });
        document.getElementById(stageId).classList.add('active');
    };

    const updateLifeCrystalsDisplay = () => {
        lifeCrystals.forEach((crystal, index) => {
            if (index < userLives) {
                crystal.classList.remove('lost');
            } else {
                crystal.classList.add('lost');
                playAudio(audioHeartShatter); // Toca som ao perder vida
            }
        });
    };

    const updateLoveProgressMeter = () => {
        if (loveProgressMeter) {
            loveProgressMeter.style.width = `${loveProgress}%`;
            progressText.textContent = `${Math.round(loveProgress)}% Amor Mágico`;
        }
    };

    // FUNÇÃO showCompanionBubble ATUALIZADA para PNG e nomes simplificados
    const showCompanionBubble = (text, duration = 3000, newState = companionState) => {
        if (companionSpeechBubble && magicalCompanion) {
            // Define o novo estado emocional (neutro ou triste)
            companionState = newState;

            // Altera a imagem para a versão "falando" (boca aberta) do estado atual
            magicalCompanion.src = `comp_${companionState}_fala.png`; // MUDANÇA AQUI

            companionSpeechBubble.textContent = text;
            companionSpeechBubble.classList.add('show');

            // Após a duração, remove a bolha e volta para a versão "parado" (boca fechada)
            setTimeout(() => {
                companionSpeechBubble.classList.remove('show');
                magicalCompanion.src = `comp_${companionState}.png`; // MUDANÇA AQUI
            }, duration);
        }
    };

    const showPageContent = (contentHtml, callback) => {
        if (pageInnerContent) {
            pageInnerContent.classList.remove('visible');
            setTimeout(() => {
                pageInnerContent.innerHTML = contentHtml;
                pageInnerContent.classList.add('visible');
                if (callback) callback();
            }, 500); // Tempo para a transição de saída do conteúdo
        } else if (callback) {
            callback();
        }
    };

    const animateHeartShatter = (callback) => {
        if (heartShatterOverlay) {
            heartShatterOverlay.classList.add('active');
            playAudio(audioHeartShatter);
            setTimeout(() => {
                heartShatterOverlay.classList.remove('active');
                if (callback) callback();
            }, 1800); // Duração do GIF de coração partindo + buffer
        } else if (callback) {
            callback();
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // --- Funções de Arrastar e Soltar (Drag & Drop) ---
    const startDragging = (e) => {
        // Apenas se o jogo não estiver ativo E o cadeado não estiver destrancado
        if (gameActive || lockUnlocked) return;

        isDragging = true;
        currentDraggable = magicKeyCharm; // Define explicitamente a chave como arrastável

        // Adiciona classe para estilo de arrasto
        currentDraggable.classList.add('dragging');

        // Garante que a chave esteja em 'fixed' para arrasto fora dos limites do contêiner pai
        currentDraggable.style.position = 'fixed';
        currentDraggable.style.zIndex = '1000'; // Acima de tudo

        // Calcula o offset do mouse/toque em relação ao elemento
        const rect = currentDraggable.getBoundingClientRect();
        // Garante compatibilidade com mouse e touch
        offsetX = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - rect.left;
        offsetY = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)) - rect.top;

        // Impede o comportamento padrão de arrasto do navegador (especialmente para mobile)
        e.preventDefault();
    };

    const doDragging = (e) => {
        if (!isDragging || !currentDraggable) return;

        // Calcula a nova posição do elemento
        let x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - offsetX;
        let y = (e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0)) - offsetY;

        // Limita o arrasto dentro da janela visível
        x = Math.max(0, Math.min(x, window.innerWidth - currentDraggable.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - currentDraggable.offsetHeight));

        currentDraggable.style.left = `${x}px`;
        currentDraggable.style.top = `${y}px`;
    };

    const stopDragging = (e) => {
        if (!isDragging || !currentDraggable) return;

        isDragging = false;
        currentDraggable.classList.remove('dragging');

        // Reset o z-index para evitar que ele permaneça no topo se não for solto no alvo
        currentDraggable.style.zIndex = '';

        // Obtenha as coordenadas do ponto onde o arrasto parou
        const dropX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX);
        const dropY = e.clientY || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : e.clientY);

        // Obtenha a posição e dimensões do cadeado alvo (postQuizLockScreen)
        const lockRect = guardianHeartLockPostQuiz.getBoundingClientRect();

        // Verifica se o ponto de soltura está sobre o cadeado
        if (dropX >= lockRect.left && dropX <= lockRect.right &&
            dropY >= lockRect.top && dropY <= lockRect.bottom) {

            // Soltou sobre o cadeado!
            handleUnlockCharm();
        } else {
            // Volta a chave para a posição original se não soltou no alvo
            currentDraggable.style.position = 'relative'; // Volta a ser relativo ao contêiner
            currentDraggable.style.left = ''; // Limpa a posição absoluta
            currentDraggable.style.top = ''; // Limpa a posição absoluta
            // Reanexa ao container original se tiver sido movido (garantia)
            if (magicKeyCharmContainer && !magicKeyCharmContainer.contains(currentDraggable)) {
                magicKeyCharmContainer.appendChild(currentDraggable);
            }
        }
        currentDraggable = null;
    };

    // Adiciona os event listeners globais para arrastar
    document.addEventListener('mousemove', doDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', doDragging, { passive: false });
    document.addEventListener('touchend', stopDragging);


    // --- Lógica Principal do Jogo ---

    // Função para pré-carregar imagens
    const preloadImages = (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onerror = () => console.warn(`Falha ao carregar imagem: ${url}`); // Para debug
        });
    };

    const init = () => {
        totalQuestions = questions.length;
        startJourneyButton.addEventListener('click', handleStartJourney);
        startQuizButton.addEventListener('click', handleStartQuiz);

        // Adiciona listeners de drag à chave
        magicKeyCharm.addEventListener('mousedown', startDragging);
        magicKeyCharm.addEventListener('touchstart', startDragging, { passive: false });

        updateLifeCrystalsDisplay();
        updateLoveProgressMeter();
        document.querySelector('.sanctuary-footer-message').textContent = `Com todo o meu amor, ${yourName}`;

        // Define o companheiro como neutro no início (PNG)
        magicalCompanion.src = `comp_neutro.png`;

        // --- Pré-carregamento de todas as imagens usadas no jogo ---
        const imagesToPreload = [];
        questions.forEach(q => {
            if (q.background) imagesToPreload.push(q.background);
            if (q.questionImage) imagesToPreload.push(q.questionImage);
        });
        finalPhotos.forEach(photo => imagesToPreload.push(photo));
        sanctuaryPhotos.forEach(photo => imagesToPreload.push(photo));
        // Adicione outras imagens que podem ser carregadas via CSS background-image se não estiverem já lá
        imagesToPreload.push('favicon.png', 'coracao.png', 'comp_neutro.png', 'comp_neutro_fala.png', 'comp_triste.png', 'comp_triste_fala.png', 'quebrado.png', 'falling_heart.png', 'falling_sparkle.png');
        preloadImages(imagesToPreload);
    };

    const handleStartJourney = () => {
        if (gameActive) return;
        gameActive = true;
        startJourneyButton.disabled = true;

        dreamBookCover.style.transform = 'rotateY(180deg) scale(0.8)';
        dreamBookCover.style.opacity = '0';
        playAudio(audioBookOpen);

        setTimeout(() => {
            switchStage('preQuizLockScreen'); // Vai para a tela do cadeado antes do quiz
            dreamBookCover.style.display = 'none';
            // Mensagem inicial na tela do cadeado, com companheiro no estado 'neutro'
            showCompanionBubble("Prove seu amor respondendo às perguntas!", 3500, 'neutro');
        }, 1500);
    };

    const handleStartQuiz = () => {
        // Resetar o estado do jogo para um novo início de quiz
        currentQuestionIndex = 0;
        userLives = 3;
        loveProgress = 0;
        updateLifeCrystalsDisplay();
        updateLoveProgressMeter();
        lockUnlocked = false; // Garante que o cadeado comece trancado

        // Garante que o companheiro esteja neutro ao iniciar o quiz (PNG)
        companionState = 'neutro';
        magicalCompanion.src = `comp_neutro.png`;

        switchStage('gameScreen'); // Vai para a tela do quiz
        loadQuestion(); // Carrega a primeira pergunta
    };


    // Função para carregar a próxima pergunta
    const loadQuestion = () => {
        if (currentQuestionIndex < totalQuestions) {
            playAudio(audioPageTurn);
            magicalPagesWrapper.classList.add('page-turning');

            setTimeout(() => {
                const q = questions[currentQuestionIndex];

                magicalPagesWrapper.style.backgroundImage = `url(${q.background})`;

                let questionImageHtml = q.questionImage ?
                    `<div class="question-image-container"><img src="${q.questionImage}" alt="Imagem da Pergunta" class="question-image"></div>` : '';

                let optionsHtml = shuffleArray([...q.options]).map(option =>
                    `<button class="answer-button" data-answer="${option}">${option}</button>`
                ).join('');

                const questionHtml = `
                    <div class="page-content-wrapper">
                        ${questionImageHtml}
                        <p class="question-text">${q.question}</p>
                        <div class="answer-options-grid">${optionsHtml}</div>
                        <p class="feedback-message" id="feedbackMessage"></p>
                    </div>
                `;
                showPageContent(questionHtml, () => {
                    magicalPagesWrapper.classList.remove('page-turning');
                    setTimeout(() => magicalPagesWrapper.classList.add('page-turn-in'), 50);

                    document.querySelectorAll('.answer-button').forEach(button => {
                        button.addEventListener('click', handleAnswer);
                    });
                    // Companheiro neutro ao carregar nova pergunta (mas boca aberta ao falar)
                    showCompanionBubble("Sua memória de fada está afiada?", 3000, 'neutro');
                });
            }, 700);
        } else {
            stopAudio(audioPageTurn);
            showPostQuizLockScreen();
        }
    };

    const handleAnswer = (event) => {
        const selectedAnswer = event.target.dataset.answer;
        const currentQ = questions[currentQuestionIndex];
        const feedbackMessageElement = document.getElementById('feedbackMessage');

        document.querySelectorAll('.answer-button').forEach(button => button.disabled = true);

        const isCorrect = Array.isArray(currentQ.correctAnswer) ?
            currentQ.correctAnswer.includes(selectedAnswer) :
            selectedAnswer === currentQ.correctAnswer;

        if (isCorrect) {
            playAudio(audioCorrectAnswer);
            // Companheiro fica neutro
            showCompanionBubble(currentQ.companionSpeechCorrect || "Acertou em cheio! Sua intuição é incrível!", 2500, 'neutro');
            feedbackMessageElement.textContent = "Resposta Mágica!";
            feedbackMessageElement.className = "feedback-message show feedback-correct";
            loveProgress += (100 / totalQuestions);
            updateLoveProgressMeter();

            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < totalQuestions) {
                    loadQuestion();
                } else {
                    stopAudio(audioPageTurn);
                    showPostQuizLockScreen();
                }
            }, 2800);
        } else {
            playAudio(audioWrongAnswer);
            // Companheiro fica triste
            showCompanionBubble(currentQ.companionSpeechWrong || "Essa magia não funcionou! Mas não desista!", 2500, 'triste');
            feedbackMessageElement.textContent = "Caminho Errante!";
            feedbackMessageElement.className = "feedback-message show feedback-wrong";
            userLives--;
            updateLifeCrystalsDisplay();

            animateHeartShatter(() => {
                if (userLives <= 0) {
                    playAudio(audioGameOverJingle);
                    // Companheiro triste no Game Over
                    showCompanionBubble("As energias se esgotaram... Mas nosso amor é forte demais para desistir! Tente de novo!", 4000, 'triste');
                    setTimeout(gameOver, 4500);
                } else {
                    document.querySelectorAll('.answer-button').forEach(button => button.disabled = false);
                    feedbackMessageElement.classList.remove('show');
                    // Companheiro volta para neutro após a bolha sumir (se não for Game Over)
                    magicalCompanion.src = `comp_neutro.png`;
                    companionState = 'neutro';
                }
            });
        }
    };

    const gameOver = () => {
        gameActive = false;
        currentQuestionIndex = 0;
        userLives = 3;
        loveProgress = 0;
        updateLifeCrystalsDisplay();
        updateLoveProgressMeter();

        switchStage('introScreen');
        dreamBookCover.style.transform = 'rotateY(0deg) scale(1)';
        dreamBookCover.style.opacity = '1';
        dreamBookCover.style.display = 'flex';
        startJourneyButton.disabled = false;
        // Companheiro volta para neutro no início do jogo (PNG)
        showCompanionBubble("Sempre há uma nova chance para o amor!", 3000, 'neutro');
    };

    // Função para mostrar o cadeado pós-quiz (arrastar chave)
    const showPostQuizLockScreen = () => {
        gameActive = false;
        switchStage('postQuizLockScreen');
        playAudio(audioSuccessQuest);
        // Companheiro neutro ao chegar no cadeado final
        showCompanionBubble("Você desvendou os segredos! A chave para o nosso Coração Guardião está aqui!", 3500, 'neutro');

        if (!magicKeyCharmContainer.contains(magicKeyCharm)) {
            magicKeyCharmContainer.appendChild(magicKeyCharm);
        }
        magicKeyCharm.style.position = 'relative';
        magicKeyCharm.style.left = '';
        magicKeyCharm.style.top = '';

        magicKeyCharmContainer.classList.add('visible');
        magicKeyCharm.classList.add('draggable');
    };

    const handleUnlockCharm = () => {
        if (lockUnlocked) return;

        lockUnlocked = true;
        playAudio(audioUnlockCharm);
        guardianHeartLockPostQuiz.classList.add('unlocked');

        setTimeout(() => {
            if (magicKeyCharm.parentNode) {
                magicKeyCharm.parentNode.removeChild(magicKeyCharm);
            }
        }, 800);

        magicKeyCharmContainer.classList.remove('visible');

        // Companheiro neutro ao destrancar o cadeado
        showCompanionBubble("O Coração Guardião se abriu! A magia do nosso amor é imensa!", 3500, 'neutro');

        setTimeout(() => {
            showPhotoRevealScreen();
        }, 2500);
    };

    const showPhotoRevealScreen = () => {
        switchStage('photoRevealScreen');
        playAudio(audioDiscovery);

        photoRevealArea.querySelectorAll('.floating-photo').forEach(photo => photo.remove());

        const shuffledPhotos = shuffleArray([...finalPhotos]);
        shuffledPhotos.forEach((photoSrc, index) => {
            const img = document.createElement('img');
            img.src = `${photoSrc}`;
            img.classList.add('floating-photo');
            photoRevealArea.appendChild(img);

            const delay = Math.random() * 2;
            const duration = Math.random() * 10 + 10;
            const size = Math.random() * 0.4 + 0.8;

            img.style.left = `${Math.random() * 80 + 10}%`;
            img.style.top = `${Math.random() * 80 + 10}%`;
            img.style.animationDelay = `${delay}s`;
            img.style.animationDuration = `${duration}s`;
            img.style.setProperty('--dx1', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--dy1', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--r1', `${(Math.random() * 30 - 15)}deg`);
            img.style.setProperty('--s1', `${size}`);

            img.style.setProperty('--dx2', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--dy2', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--r2', `${(Math.random() * 30 - 15)}deg`);
            img.style.setProperty('--s2', `${size}`);

            img.style.setProperty('--dx3', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--dy3', `${(Math.random() * 200 - 100)}px`);
            img.style.setProperty('--r3', `${(Math.random() * 30 - 15)}deg`);
            img.style.setProperty('--s3', `${size}`);

            setTimeout(() => {
                img.style.opacity = 1;
            }, delay * 1000 + 100);
        });

        setTimeout(() => {
            secretMessagePaper.classList.add('active');
            playAudio(audioPaperOpen);
            paperContent.innerHTML = secretMessageContent;
            document.getElementById('closePaperButton').addEventListener('click', () => {
                secretMessagePaper.classList.remove('active');
                playAudio(audioPaperClose);
                setTimeout(showSanctuaryScreen, 800);
            });
        }, (finalPhotos.length * 200) + 1000);
    };

    const showSanctuaryScreen = () => {
        switchStage('sanctuaryScreen');
        playAudio(audioFinalMelody);
        sanctuaryTitle.textContent = sanctuaryTitleContent;
        sanctuaryText.innerHTML = `<p>Que cada imagem deste santuário te lembre do quanto somos especiais juntos. Este é o nosso lugar, onde o amor floresce e as memórias se tornam eternas.</p>`;

        let galleryHtml = sanctuaryPhotos.map(photo => `<img src="${photo}" alt="Nossa Foto">`).join('');
        sanctuaryGallery.innerHTML = galleryHtml;

        // Companheiro neutro no santuário
        showCompanionBubble("Nosso Santuário Secreto está completo, meu amor!", 4000, 'neutro');
    };

    // --- Inicialização ---
    init();
});

// Este código verifica se o celular ou navegador consegue usar o Service Worker (o "mágico do offline").
// Se sim, ele "registra" seu service-worker.js quando a página carrega.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(err => {
                console.log('Falha ao registrar o Service Worker:', err);
            });
    });
}
