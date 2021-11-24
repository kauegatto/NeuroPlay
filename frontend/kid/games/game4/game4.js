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
    }
  });
  $('.terminar').on("click", function () {
    let cdAvaliacao = $(this).attr('id');
    terminarAtividade.terminarAtividade(4, cdAvaliacao);
  });
});

