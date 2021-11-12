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
        const { id } = req.params;
        const response = await gamesModel.SelectedTheme(id);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async OneGame(req, res) {
        const { id } = req.params;
        const response = await gamesModel.SelectedGame(id);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

}

export default new GamesController();
