//localStorage.clear();

$(document).on("click", "#btnEntrar", function () {

  $.ajax({
    url: "http://localhost:3000/tokens/login",
    data: { "email": $("#emailInput").val(), "password": $("#passwordInput").val() },
  }).done(function (data) {
    console.log(data);
  }).fail(function () {
    alert("erro faz direito ai");
  })

});
