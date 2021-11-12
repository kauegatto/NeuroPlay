localStorage.clear();
$(document).on("click", "#btnEntrar", function () {
  let isResponsible = 1/*pegar pelo radiobutton*/, deuErro = 0;
  if (isResponsible) {
    const URL = "http://localhost:3000/tokens/login";
    options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({ "email": $("#emailInput").val(), "password": $("#passwordInput").val() }),
    };

    fetch(URL, options).then(function (response) {
      if (!response.ok) {
        deuErro = 1;
      }
      return response.json();
    }).then(json => {
      if (!deuErro) {
        localStorage.setItem("authorization", json.token);
        alert("Logado com sucesso");
        window.location.href = '../responsible/html/pacientes.html';
      }
      else {
        alert(json.msg);
      }
    })

  }
  else {

  }
});
