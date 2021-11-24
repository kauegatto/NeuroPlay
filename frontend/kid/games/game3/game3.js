let terminarAtividade = new TerminarAtividade();
let contador = 0;
$(document).ready(function () {
  $('div.question img').on("click", function () {
    console.log("click");
    if ($(this).hasClass('certa')) {
      $(`audio:eq(0)`).remove();
      $(this).parent().hide();
      contador++;
      $(`.question:eq(${contador})`).show();
    }
    else {
      alert("Animal incorreto, tente novamente!");
    }
    if (contador == 3) {
      $(".finalizarAtividade").show()
      $("#TituloAtividade").hide();
    } /*como so tem 3 etapas a quarta é justament mostrar a tela de avaliar*/
  });
  $('.terminar').on("click", function () {
    let cdAvaliacao = $(this).attr('id');
    terminarAtividade.terminarAtividade(1, cdAvaliacao);
    /*primeiro parametro é o id do jogo, segundo eh a dificuldade*/
    /* 
       1 facil 
       2 medio
       3 dificil
    */
  });
});

