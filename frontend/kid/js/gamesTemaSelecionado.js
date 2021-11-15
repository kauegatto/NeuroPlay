const urlParams = new URLSearchParams(window.location.search);
const cdTema = urlParams.get('cdTema');

function listarGames() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/games/themeGame?cdTema=${cdTema}`;

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

            console.log(resultado);

            resultado.forEach(element => {

                setColor();
                let games = `
                <a href="playGame.html?cdAtividade=${element.cd_atividade}" class="contentHref">
                    <div class="contentBlock" id="${tema}">
                        <p class="contentText" style="transform: translate(-50%, 50%);">${element.nm_atividade}</p>
                    </div>
                </a>`;

                $('.content').append(games);

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

let cont = 0;
let tema;

function setColor() {

    switch (cont) {
        case 0:
            tema = 'TemaAmarelo';
            break;
        case 1:
            tema = 'TemaVermelho'
            break;
        case 2:
            tema = 'TemaAzul';
            break;
        case 3:
            tema = 'TemaVerde';
            break;
        case 4:
            tema = 'TemaRoxo';
            cont = -1;
            break;
    }

    cont++;


}

$(document).ready(function () {

    listarGames();

});