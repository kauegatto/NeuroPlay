let terminarAtividade = new TerminarAtividade();
let contador = 0;
$(document).ready(function () {
  $('div.question button').on("click", function () {
    if ($(this).hasClass('certo')) {
      $(this).parents('.question').hide();
      contador++;
      $(`.question:eq(${contador})`).show();
    }
    else {
      alert("Letra incorreta, tente novamente!");
    }
    if (contador == 3) {
      $(".finalizarAtividade").show()
      $("#TituloAtividade").hide();
    } /*como so tem 3 etapas a quarta é justament mostrar a tela de avaliar*/
  });
  $('.terminar').on("click", function () {
    let cdAvaliacao = $(this).attr('id');
    terminarAtividade.terminarAtividade(3, cdAvaliacao);
    /*primeiro parametro é o id do jogo, segundo eh a dificuldade*/
    /* 
       1 facil 
       2 medio
       3 dificil
    */
  });
});

