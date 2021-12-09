localStorage.clear();
$(document).ready(function () {
  $('#cbxCrianca').click();
  $(document).on("click", "#btnEntrar", function () {
    let deuErro = 0;
    if ($('#cbxCrianca:checked').val() == 1) {
      const base_url = "http://localhost:3000";
      const URL = `${base_url}/tokens/loginPaciente`;
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
          window.location.href = '../kid/html/games.html';
        }
        else {
          alert(json.msg);
        }
      })

    }
    else if ($('#cbxAdulto:checked').val() == 0) {
      const base_url = "http://localhost:3000";
      const URL = `${base_url}/tokens/loginUsuario`;

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
  $("#labelPaciente").click(function () {
    $("#cbxCrianca").click();
  });
  $("#labelResponsavel").click(function () {
    $("#cbxAdulto").click();
  });
});

