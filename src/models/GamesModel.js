import dbConnection from '../db/DbConnection.js'; /*instancia de dbConnection*/

class GamesModel {

    async AllThemes() {

        const query = `CALL dadosTema();`;

        try {
            const [rows, err] = await dbConnection.executeQuery(query);

            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "msg": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "msg": "pane no sistema (coisa no banco)" }];
        }

    }

    async SelectedTheme(cdTema) {

        const query = `CALL dadosAtividade('${cdTema}');`;

        try {
            const [rows, err] = await dbConnection.executeQuery(query);
            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "msg": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "msg": "pane no sistema (coisa no banco)" }];
        }

    }

    async SelectedGame(cdAtividade) {
        const query = `CALL dadosAtividadeEscolhida('${cdAtividade}');`;
        try {
            const [rows, err] = await dbConnection.executeQuery(query);
            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "msg": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "msg": "pane no sistema (coisa no banco)" }];
        }

    }
    async InsertGameResult(loggedUser, cdAtividade, cdAvaliacao, dtInicio, hrInicio, dtFim, hrFim, qtdNota) {
        if (!(loggedUser || cdAtividade || cdAvaliacao || dtInicio || dtFim || hrFim || hrInicio)) {
            return [500, { "msg": "Não foram enviados todos os campos necessários para registrar sua atividade" }];
        }
        if (!qtdNota) {
            qtdNota = 0;
        }
        const query = `CALL inserirResultadoJogo('${loggedUser}','${cdAtividade}','${cdAvaliacao}','${dtInicio}','${dtFim}','${hrInicio}','${hrFim}','${qtdNota}');`;
        try {
            const [rows, err] = await dbConnection.executeQuery(query);
            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "msg": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "msg": "pane no sistema (coisa no banco)" }];
        }
    }
}

export { GamesModel }