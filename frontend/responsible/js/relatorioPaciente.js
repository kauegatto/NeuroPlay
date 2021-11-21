const urlParams = new URLSearchParams(window.location.search);
const emailPaciente = urlParams.get('email');

function relatorioPaciente() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/patient/report/?email=${emailPaciente}`;

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

                let maiorDif = element.maiorDif != null ? element.maiorDif : "";
                let menorDif = element.menorDif != null ? element.menorDif : "";

                let report = `

                <p style="margin: 20px 0; font-size: 21px;">${element.nm_paciente}</p>
                <div>
                    <span class="spanRelatorio">Atividade(s) Feita(s): ${element.qtdAtividade}</span>
                    <a href="atividadesRealizadas.html?emailPaciente=${element.nm_login_paciente}"><button id="btnVer">Ver</button></a>
                </div>
                <div class="divRelatorio">
                    <span class="spanRelatorio">Tempo total em atividades: ${element.tempoDiff}</span>
                </div>
                <div class="divRelatorio">
                    <span class="spanRelatorio">Tempo médio em atividades: ${element.tempoMedio}</span>
                </div>
                <div class="divRelatorio">
                    <span class="spanRelatorio">Tema de maior dificuldade:</span>
                    <span class="txtAmarelo">${maiorDif}</span>
                </div>
                <div class="divRelatorio">
                    <span class="spanRelatorio">Tema de maior facilidade:</span>
                    <span class="txtAmarelo">${menorDif}</span>
                </div>
                <div class="divRelatorio">
                    <span class="txtAmarelo" style="margin-left: 5px;">O paciente fez ${element.qtdAtividadeQuiz} atividades no estilo “${element.nomeQuiz}” e
                        obteve uma média de ${element.notaQuiz} pontos entre 0 e 5</span>
                </div>
                <p style="font-size: 17px; margin: 10px 0;">Atividades por dia</p>
                <button id="btnAtividade">últimos 7 dias</button>
                <div>
                    <p>GRAFICO</p>
                </div>
                `;

                $('.content').append(report);

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

    relatorioPaciente();

});