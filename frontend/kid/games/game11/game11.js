let terminarAtividade = new TerminarAtividade();
let contador = 1;

$(document).ready(function () {

  $('div.question img').on("click", function () {

    console.log("click");
    if ($(this).hasClass('certa')) {
      contador++;
      $(this).parent().hide();
      $('#question2').show();
      //$(`.question:eq(${contador})`).show();

    }

    if (contador == 3) {
      $(".finalizarAtividade").show();
      $('#question2').hide();
      $('#titulo').hide();
    } /*como so tem 3 etapas a quarta é justament mostrar a tela de avaliar*/
  });

  $('.terminar').on("click", function () {
    let cdAvaliacao = $(this).attr('id');
    terminarAtividade.terminarAtividade(11, cdAvaliacao);
    /*primeiro parametro é o id do jogo, segundo eh a dificuldade*/
    /* 
       1 facil 
       2 medio
       3 dificil
    */
  });
});

