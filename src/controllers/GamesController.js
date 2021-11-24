import { GamesModel } from "../models/GamesModel.js";

const gamesModel = new GamesModel();

class GamesController {

    async GetTheme(req, res) {
        const response = await gamesModel.AllThemes();
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async FindOneTheme(req, res) {
        const { cdTema } = req.query;
        const response = await gamesModel.SelectedTheme(cdTema);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async OneGame(req, res) {
        const { cdAtividade } = req.query;
        const response = await gamesModel.SelectedGame(cdAtividade);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async SendGameResult(req, res) {
        const loggedUser = req.loggedUser;
        const { cdAtividade, cdAvaliacao, dtInicio, hrInicio, dtFim, hrFim, qtdNota } = req.body;
        const response = await gamesModel.InsertGameResult(loggedUser, cdAtividade, cdAvaliacao, dtInicio, hrInicio, dtFim, hrFim, qtdNota);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }
}

export default new GamesController();
