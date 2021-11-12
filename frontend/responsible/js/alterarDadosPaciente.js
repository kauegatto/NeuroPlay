const urlParams = new URLSearchParams(window.location.search);
const login = urlParams.get('login');
if (!login) {
  alert("Você precisa escolher um paciente para editar");
  window.location.href = '../html/pacientes.html';
}
function preencherDadosPaciente() {
  let deuErro = 0, responseStatus = 0;
  const URL = `http://localhost:3000/Patient/find/${login}`;
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

$(document).ready(function () {
  preencherDadosPaciente();

})