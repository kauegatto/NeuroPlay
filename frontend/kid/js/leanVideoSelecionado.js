const urlParams = new URLSearchParams(window.location.search);
const cdVideo = urlParams.get('cdVideo');

function dadosVideo() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/learn/videoSelecionado?cdVideo=${cdVideo}`;

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

                let video = `
                <h1 id="NomeDoJogo">${element.nm_video}</h1>
                <p id="DescricaoDoJogo">${element.ds_conteudo_video}</p>
                <p id="jaJogou"></p>
                <a href="${element.nm_link_video}"  target="_blank"><button class="btnAmarelo" id="btnJogar">Assistir</button></a>`;

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

    dadosVideo();

});