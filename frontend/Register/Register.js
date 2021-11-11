$(document).on("click", "#btnCriarConta", function () {

    const URL = "http://localhost:3000/user/create";

    options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        //headers: { "authentication": cookies.authentication },
        body: JSON.stringify({

            "email": $("#emailInput").val(), "password": $("#passwordInput").val(),
            "phoneNumber": $('#phoneNumberInput').val(), "username": $('#nomeInput').val()

        }),
    };

    fetch(URL, options)
        .then(response => (response.json()))
        .then(json => {
            console.log(json);
            if (json.code == 200) {
                document.cookie = "authorization=" + json.token;
                alert("Usuário criado com sucesso!");
                alert(document.cookie);
                window.location.href = '../Login/login.html';
            }
            else {
                alert(json.msg);
            }
        })

});