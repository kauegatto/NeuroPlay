function listarPacientes() {

  let deuErro = 0, responseStatus = 0;

  const URL = "http://localhost:3000/user/findPatients";

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
      try {
        json.forEach(element => {
          let patient = `
          <div class="infoPaciente" >
            <a href="relatorioPaciente.html?email=${element.nm_login_paciente}">
              <span class="NomePaciente">${element.nm_paciente}</span>
            </a>
            <a href="alterarDadosPaciente.html?login=${element.nm_login_paciente}">
              <img src="../../img/iconEditar.png" alt="" style="margin-top: 5px; float: left; position:relative;left:-10px;">
            </a>
            <img class="deletarPaciente" id="${element.nm_login_paciente}" src="../../img/iconLixo.png" alt="" style="margin: 5px 4px; float: left;"></div>`;
          $('.content').append(patient);
        });
      }
      catch {
        $('.content').append(`<h1 style="font-size: 20px;">${json.msg}</h1>`)
      }
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
    }
  })
}

function deletarPaciente(login) {

  let deuErro = 0, responseStatus = 0;
  const URL = `http://localhost:3000/patient/${login}`;
  if (!localStorage.getItem("authorization")) {
    /* poupar recurso, nem faz o request*/
    alert("Você precisa estar logado para fazer isso!");
    window.location.href = '../../login/login.html';
    return;
  }
  options = {
    method: "DELETE",
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
      alert(json.msg);
      document.location.reload(true);
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
    }
  })
}

$(document).ready(function () {
  listarPacientes();

  $(".content").on('click', '.deletarPaciente', function () {

    console.log(this.id);
    let querDeletar = confirm(`Você quer continuar no processo de deletar o paciente de login ${this.id}`);
    if (querDeletar) {
      deletarPaciente(this.id);
    }

  });
})