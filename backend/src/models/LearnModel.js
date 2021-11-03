import { connection } from '../db/dbConnection';

class LearnModel {

    async AllThemes() {

        const query = `CALL dadosTema();`;

        try {

            const [rows, fields, err] = await connection.execute(query);

            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "erro": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "erro": "pane no sistema (coisa no banco)" }];
        }

    }

    async SelectedTheme(cdTema) {

        const query = `CALL dadosAtividade('${cdTema}');`;

        try {

            const [rows, fields, err] = await connection.execute(query);

            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "erro": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "erro": "pane no sistema (coisa no banco)" }];
        }

    }

    async Video() {

        const query = `CALL videosPaciente();`;

        try {

            const [rows, fields, err] = await connection.execute(query);

            if (!err) {
                return [200, { "msg": rows[0] }];
            }
            else {
                return [500, { "erro": "coisa no banco" }];
            }
        }
        catch (e) {
            console.log(e);
            return [500, { "erro": "pane no sistema (coisa no banco)" }];
        }

    }

}

export { LearnModel }