import { LearnModel } from "../models/LearnModel";

const learnModel = new LearnModel();

class LearnController {

    async GetTheme(req, res) {
        const caralogado = req.loggedUser;
        const response = await gamesModel.AllThemes();
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async FindOneTheme(req, res) {
        const caralogado = req.loggedUser;
        const { id } = req.params;
        const response = await gamesModel.SelectedTheme(id);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async AlllVideos(req, res) {
        const caralogado = req.loggedUser;
        const { id } = req.params;
        const response = await learnModel.Video();
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

}

export default new LearnController();
