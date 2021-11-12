import dbConnection from '../db/DbConnection.js'; /*instancia de dbConnection*/

class GamesModel {

    async AllThemes() {

        const query = `CALL dadosTema();`;

        try {
            const connection = await dbConnection.openConnection();
            const [rows, fields, err] = await connection.execute(query);
            dbConnection.closeConnection(connection);
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
            const connection = await dbConnection.openConnection();
            const [rows, fields, err] = await connection.execute(query);
            dbConnection.closeConnection(connection);
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
            const connection = await dbConnection.openConnection();
            const [rows, fields, err] = await connection.execute(query);
            dbConnection.closeConnection(connection);
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