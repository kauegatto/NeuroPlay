localStorage.clear();
$(document).on("click", "#btnEntrar", function () {

  let deuErro = 0;

  if ($('#cbxCrianca:checked').val() == 1) {
    console.log('entrou');
    const URL = "http://localhost:3000/tokens/loginPaciente";

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
        window.location.href = '../kid/html/learn.html';
      }
      else {
        alert(json.msg);
      }
    })

  }
  else if ($('#cbxAdulto:checked').val() == 0) {
    console.log('entrou usuario');
    const URL = "http://localhost:3000/tokens/loginUsuario";

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
  } else {
    alert('Selecione alguma opção!');
  }

});
