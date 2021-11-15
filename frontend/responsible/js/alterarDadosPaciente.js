const urlParams = new URLSearchParams(window.location.search);
const login = urlParams.get('login');

if (!login) {
  alert("Você precisa escolher um paciente para editar");
  window.location.href = '../html/pacientes.html';
}

function preencherDadosPaciente() {
  let deuErro = 0, responseStatus = 0;
  const URL = `http://localhost:3000/patient/find/${login}`;
  if (!localStorage.getItem("authorization")) {
    /* poupar recurso, nem faz o request*/
    alert("Você precisa estar logado para fazer isso!");
    window.location.href = '../../login/login.html';
    return;
  }

  options = {
    method: "GET",
    headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("authorization") },
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
      $('#usernameInput').val(json.nm_paciente);
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
    }
  })
}

function alterarTudo() {
  let deuErro = 0, responseStatus = 0;
  const URL = `http://localhost:3000/patient?login=${login}`;
  if (!localStorage.getItem("authorization")) {
    /* poupar recurso, nem faz o request*/
    alert("Você precisa estar logado para fazer isso!");
    window.location.href = '../../login/login.html';
    return;
  }
  options = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("authorization") },
    mode: 'cors',
    body: JSON.stringify({
      "newPassword": $("#passwordInput").val(), "newUsername": $("#usernameInput").val()
    })
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
      window.location.href = "pacientes.html"
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
      return;
    }
  })
}

function alterarNome() {
  let deuErro = 0, responseStatus = 0;
  const URL = `http://localhost:3000/patient/changePatientName/${login}`;
  if (!localStorage.getItem("authorization")) {
    /* poupar recurso, nem faz o request*/
    alert("Você precisa estar logado para fazer isso!");
    window.location.href = '../../login/login.html';
    return;
  }
  options = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("authorization") },
    mode: 'cors',
    body: JSON.stringify({
      "newUsername": $("#usernameInput").val()
    })
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
      window.location.href = "pacientes.html";
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
      return;
    }
  })
}

$(document).ready(function () {
  preencherDadosPaciente();
  $('#btnCadastrarPaciente').click(function () {
    if ($('#willUpdatePass').is(':checked')) {
      alterarTudo();
    }
    else {
      alterarNome();
    }
  })
  $('#willUpdatePass').click(() => $('#alterarSenha').toggle());
})

