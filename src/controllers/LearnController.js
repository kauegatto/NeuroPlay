import { LearnModel } from "../models/LearnModel.js";

const learnModel = new LearnModel();

class LearnController {

    async GetTheme(req, res) {
        const response = await learnModel.AllThemes();
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async AlllVideosTheme(req, res) {
        const { cdTema } = req.query;
        const response = await learnModel.Videos(cdTema);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

    async SelectedVideo(req, res) {
        const { cdVideo } = req.query;
        const response = await learnModel.OneVideo(cdVideo);
        res.status(response[0]);
        res.json(response[1]);
        return;
    }

}

export default new LearnController();
