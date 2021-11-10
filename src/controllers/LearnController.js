import { LearnModel } from "../models/LearnModel.js";

const learnModel = new LearnModel();

class LearnController {

    async GetTheme(req, res) {
        const caralogado = req.loggedUser;
        const response = await learnModel.AllThemes();
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async AlllVideosTheme(req, res) {
        const caralogado = req.loggedUser;
        const { id } = req.params;
        const response = await learnModel.Videos(id);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async SelectedVideo(req, res) {

        const caralogado = req.loggedUser;
        const { id } = req.params;
        const response = await learnModel.OneVideo(id);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }


}

export default new LearnController();
