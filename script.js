document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção dos Elementos do HTML ---
    const startBox = document.getElementById('start-box');
    const okButton = document.getElementById('ok-button');
    const gameArea = document.getElementById('game-area');
    const countdownDisplay = document.getElementById('countdown');
    const resultMessage = document.getElementById('result-message');

    // --- Variáveis de Controle do Jogo ---
    let canShoot = false;
    let gameOver = false;

    // --- captura dos Nomes dos Jogadores ---
    const player1NameInput = document.getElementById('player1-name');
    const player2NameInput = document.getElementById('player2-name');

    let player1Name = '';
    let player2Name = '';

    // --- Evento do Botão OK ---
    okButton.addEventListener('click', () => {

        // Verifica se os nomes dos jogadores foram preenchidos
        if (player1NameInput.value.trim() === '' || player2NameInput.value.trim() === '') {
            alert('Por favor, preencha os nomes dos jogadores!');
            return;
        }

        // Atualiza os nomes dos jogadores na área de jogo
        player1Name = player1NameInput.value.trim();
        player2Name = player2NameInput.value.trim();
        document.getElementById('player1-name-display').textContent = player1Name;
        document.getElementById('player2-name-display').textContent = player2Name;

        startBox.style.display = 'none';
        gameArea.classList.remove('hidden');
        startGame();
    });

    // --- Função para Iniciar o Jogo ---
    function startGame() {
        // Reseta o estado do jogo para um novo duelo
        canShoot = false;
        gameOver = false;
        resultMessage.textContent = ''; // Limpa a mensagem de resultado anterior
        countdownDisplay.textContent = 'Prepare-se...';
        countdownDisplay.style.display = 'block'; // Garante que o placar esteja visível

        let count = 3;
        
        const countdownInterval = setInterval(() => {
            if (count > 0) {
                countdownDisplay.textContent = count;
                count--;
            } else {
                countdownDisplay.textContent = 'FOGO!';
                canShoot = true;
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // --- Evento de Tecla Pressionada ---
    document.addEventListener('keydown', (event) => {
        if (gameOver) {
            return;
        }

        const key = event.key.toLowerCase();

        if ((key === 'q' || key === 'p') && !canShoot) {
            const loser = key === 'q' ? player1Name : player2Name;
            endGame(`${loser} é um covarde! Atirou antes da hora!`);
        }
        
        if ((key === 'q' || key === 'p') && canShoot) {
            const winner = key === 'q' ? player1Name : player1Name;
            endGame(`${winner} venceu o duelo!`);
        }
    });

    // --- Função para Terminar o Jogo ---
    function endGame(message) {
        gameOver = true;
        canShoot = false;
        resultMessage.textContent = message;
        countdownDisplay.style.display = 'none'; // Esconde o "FOGO!"

        // --- NOVA IMPLEMENTAÇÃO: BOTÃO "JOGAR NOVAMENTE" ---
        // Espera um pouco para não aparecer imediatamente
        setTimeout(() => {
            // 1. Cria um novo elemento de botão
            const playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Jogar Novamente';
            playAgainButton.className = 'play-again-button'; // Adiciona uma classe para estilo

            // 2. Adiciona um evento de clique para reiniciar o jogo
            playAgainButton.addEventListener('click', () => {
                // Esconde a área de jogo e mostra a caixa inicial, reiniciando o ciclo
                gameArea.classList.add('hidden');
                startBox.style.display = 'block';
            });

            // 3. Adiciona o botão na área de mensagem de resultado
            resultMessage.appendChild(playAgainButton);
        }, 1500); // 1.5 segundos de espera
    }
});