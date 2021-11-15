$(document).ready(function () {

  $('#btnCadastrarPaciente').click(function () {
    let deuErro = 0, responseStatus = 0;
    const URL = `http://localhost:3000/patient`;
    if (!localStorage.getItem("authorization")) {
      /* poupar recurso, nem faz o request*/
      alert("Você precisa estar logado para fazer isso!");
      window.location.href = '../../login/login.html';
      return;
    }
    options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("authorization") },
      body: JSON.stringify({
        "login": $("#loginInput").val(),
        "name": $("#usernameInput").val(),
        "password": $("#passwordInput").val()
      }),
      mode: 'cors',
    };
    fetch(URL, options).then(function (response) {
      if (!response.ok) {
        deuErro = 1;
      }
      responseStatus = response.status;
      return response.json();
    }).then(json => {
      if (!deuErro) {
        alert(json.msg);
        window.location.href = 'pacientes.html';
      }
      else {
        alert(json.msg);
        if (responseStatus == 498 || responseStatus == 401) {
          window.location.href = '../../login/login.html';
        }
      }
    })
  })
})