//localStorage.clear();
$(document).on("click", "#btnEntrar", function () {
  const URL = "http://localhost:3000/tokens/login";
  options = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    //headers: { "authentication": cookies.authentication },
    body: JSON.stringify({ "email": $("#emailInput").val(), "password": $("#passwordInput").val() }),
  };
  fetch(URL, options)
    .then(response => (response.json()))
    .then(json => {
      console.log(json);
      if (json.code == 200) {
        alert("Logado com sucesso");
        document.cookie = `authorization=${json.token}`;
        alert(json.token);
        window.location.href('../responsible/html/pacientes.html');
      }
      else {
        alert(json.msg);
      }
    })
});
