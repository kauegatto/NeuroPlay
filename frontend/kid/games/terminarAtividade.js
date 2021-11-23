class TerminarAtividade {
  constructor() {
    this.startDate = this.getDate();
    this.startTime = this.getTime();
  }
  terminarAtividade(cdAtividade, cdAvaliacaoDiculdade, qtdNota) {
    let deuErro;
    const base_url = "http://localhost:3000";
    const URL = `${base_url}/games`;
    const options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'authorization': localStorage.getItem("authorization") },
      mode: 'cors',
      body: JSON.stringify({
        "cdAtividade": cdAtividade,
        "cdAvaliacao": cdAvaliacaoDiculdade,
        "dtInicio": this.startDate,
        "hrInicio": this.startTime,
        "dtFim": this.getDate(),
        "hrFim": this.getTime(),
        "qtdNota": qtdNota || ""
      }),
    };
    fetch(URL, options).then(function (response) {
      if (!response.ok) {
        deuErro = 1;
      }
      return response.json();
    }).then(json => {
      if (!deuErro) {
        alert("Parabéns, você terminou essa atividade!")
        window.location.href = '../../html/games.html';
      }
      else {
        alert(json.msg);
      }
    })
  }
  getTime() {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  }
  getDate() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
  }
}
