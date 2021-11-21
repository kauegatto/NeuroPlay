const urlParams = new URLSearchParams(window.location.search);
const emailPaciente = urlParams.get('emailPaciente');

function detalhesAtividade() {

    let deuErro = 0, responseStatus = 0;

    const URL = `http://localhost:3000/patient/details/?emailPaciente=${emailPaciente}`;

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

                let temNota = element.ic_tem_nota != 0 ? 'Nota: ' + element.notaQuiz : 'Essa ativdade não possui nota';

                let details = `

                    <div class="areaAtividade">
                        <h3 class="tituloAtividade">${element.dataInicio} - ${element.nm_atividade}</h3>
                        <div>
                            <span class="detalhesAtividade">Categoria:</span>
                            <span class="detalhesAtividadeAmarelo">${element.nm_tema}</span>
                        </div>
                        <div>
                            <span class="detalhesAtividade">Tempo gasto:</span>
                            <span class="detalhesAtividadeAmarelo">${element.tempoDiff}</span>
                        </div>
                        <div>
                            <span class="detalhesAtividade">Avaliação:</span>
                            <span class="detalhesAtividadeAmarelo">${element.nm_avaliacao}</span>
                        </div>
                        <div>
                            <span class="detalhesAtividade">Terminou a atividade?:</span>
                            <span class="detalhesAtividadeAmarelo">Sim</span>
                        </div>
                        <div>
                            <span class="detalhesAtividadeAmarelo" style="margin-left: 10px;">${temNota}</span>
                        </div>
                    </div>
                `;

                $('.content').append(details);

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

    detalhesAtividade();

});