import dbConnection from '../db/DbConnection.js';

class LearnModel {

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

    async Videos(cdTema) {

        const query = `CALL videoPacienteTema('${cdTema}');`;

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

    async OneVideo(cdVideo) {

        const query = `CALL videoSelecionado('${cdVideo}');`;

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

export { LearnModel }