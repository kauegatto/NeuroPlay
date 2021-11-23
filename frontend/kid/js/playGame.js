const urlParams = new URLSearchParams(window.location.search);
const cdAtividade = urlParams.get('cdAtividade');

function dadosGames() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/games?cdAtividade=${cdAtividade}`;

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

            let resultado = json.msg;

            resultado.forEach(element => {

                let video = `
                <h1 id="NomeDoJogo">${element.nm_atividade}</h1>
                <p id="DescricaoDoJogo">${element.ds_atividade}</p>
                <p id="jaJogou"></p>
                <button class="btnAmarelo" id="btnJogar">Jogar</button>`;

                $('.content').append(video);

            });
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

    dadosGames();

    $('.content').on('click', '#btnJogar', function () {

        window.location.href = `../games/game${cdAtividade}/game${cdAtividade}.html`;

    });

});