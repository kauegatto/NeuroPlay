$(document).on("click", "#btnCriarConta", function () {
    let deuErro;

    const base_url = "http://localhost:3000"
    const URL = `${base_url}/user/create`;

    options = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        //headers: { "authentication": cookies.authentication },
        body: JSON.stringify({
            "email": $("#emailInput").val(), "password": $("#passwordInput").val(),
            "phoneNumber": $('#phoneNumberInput').val(), "username": $('#usernameInput').val()
        }),
    };

    fetch(URL, options).then(function (response) {
        if (!response.ok) {
            deuErro = 1;
        }
        return response.json();
    }).then(json => {
        if (!deuErro) {
            alert(json.msg);
            window.location.href = '../login/login.html';
        }
        else {
            console.log(json);
            alert(json.msg);
        }
    })
});