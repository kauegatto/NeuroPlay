const urlParams = new URLSearchParams(window.location.search);
const cdTema = urlParams.get('cdTema');

function listarVideos() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/learn/videoTema?cdTema=${cdTema}`;

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

                setColor();

                let themes = `
                <a href="learnVideo.html?cdVideo=${element.cd_video}" class="contentHref">
                    <div class="contentBlock" id="${tema}">
                        <p class="contentText">${element.nm_video}</p>
                    </div>
                </a>`;

                $('.content').append(themes);

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

    listarVideos();

});