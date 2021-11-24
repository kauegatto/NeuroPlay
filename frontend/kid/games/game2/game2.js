const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let contador = 0;
let terminarAtividade = new TerminarAtividade();

//função para virar carta
function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();

    if (contador == 6) {
        $(".finalizarAtividade").show()
        $("#tituloAtividade").hide();
    }

}

//função que checa se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        contador++;
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

$(document).ready(function () {

    $('.terminar').on("click", function () {
        let cdAvaliacao = $(this).attr('id');
        terminarAtividade.terminarAtividade(2, cdAvaliacao);
        /*primeiro parametro é o id do jogo, segundo eh a dificuldade*/
        /* 
           1 facil 
           2 medio
           3 dificil
        */
    });

});