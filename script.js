document.addEventListener("DOMContentLoaded", function() {

    let gamestarted = false

    function mensagem(texto) {
        alert(texto)
    }

    const start = document.getElementById("startButton");
    function startgame() {
        mensagem("Teste de botão")
        gamestarted = true
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === " ") {
            if (!gamestarted) {
                startgame()
                mensagem("O jogo começou!")
            } else {
                mensagem("O jogo já começou!")
            }
        }
    })

    start.onclick = startgame

    

    document.addEventListener("keydown", function(event) {
        if (event.key === "p") {
            mensagem("Jogador 2 venceu")
        }
    })
    document.addEventListener("keydown", function(event) {
        if (event.key === "q") {
            mensagem("Jogador 1 venceu")
        }
    })

})