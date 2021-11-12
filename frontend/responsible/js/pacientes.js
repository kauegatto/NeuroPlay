$(document).ready(function () {
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
      json.forEach(element => {
        console.log(element);
        let patient = `<div class="infoPaciente" > <a href="relatorioPaciente.html"><span class="NomePaciente">${element.nm_paciente}</span></a> <a href="alterarDadosPaciente.html?login=${element.nm_login_paciente}"><img src="../../img/iconEditar.png" alt="" style="margin-top: 5px; float: left;"></a> <img src="../../img/iconLixo.png" alt="" style="margin: 5px 4px; float: left;"></div>`;
        $('.content').append(patient);
      });
    }
    else {
      alert(json.msg);
      if (responseStatus == 498 || responseStatus == 401) {
        window.location.href = '../../login/login.html';
      }
    }
  })
})