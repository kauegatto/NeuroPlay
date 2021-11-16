import { UserModel } from "../models/UserModel.js";
import { PatientModel } from "../models/PatientModel.js";

let userModel = new UserModel();
let patientModel = new PatientModel();

class UserController {
  // create
  async create(req, res) {
    const { email, password, phoneNumber, username } = req.body;
    if (!(email && password && phoneNumber, username)) {
      res.status(400);
      res.json({ "msg": "Você precisa preencher todos os campos" });
      return;
    }
    const response = await userModel.createUser(email, password, phoneNumber, username);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  // update
  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const loggedUser = await User.findByPk(req.userId);
      // req body validation;
      if (user && loggedUser) {
        if ((loggedUser.isAdmin()) || (user.getDataValue('id') === req.userId)) {
          await user.update(req.body).then(
            (updatedUser) => res.send(updatedUser),
          );
          return;
        } // check if logged user is admin or the user that is being updated

        res.status(401).json({ errors: ["You're not authorized to update another user's infomation unless you're an administrator or the user itself"] });
        return;
      }
      res.status(400);
      res.json({ errors: ["user doesn't exist"] });
    } catch (e) {
      res.status(500);
      res.json({ errors: ['Server errror'] });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      const loggedUser = await User.findByPk(req.userId);
      if (user && loggedUser) {
        if (!loggedUser.isAdmin()) {
          res.status(401).json({ errors: ["You're not authorized to delete another user unless you're an administrator"] });
          return;
        } // check if logged user is admin
        await user.destroy().then(
          (deleted) => res.send(deleted),
        );
      } else {
        res.status(400);
        res.json('this user doesn\'t exist');
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: ['server error'] });
    }
  }

  // listar todos os pacientes
  async findAllPatients(req, res) {
    const caralogado = req.loggedUser;
    const response = await patientModel.findAllFromUser(caralogado);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  /* alterar dados*/
  async changePassword(req, res) {
    const caralogado = req.loggedUser;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json({ "msg": "Preencha ambos os campos" });
      return;
    }
    const response = await userModel.changePassword(caralogado, oldPassword, newPassword);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async changePhoneNumber(req, res) {
    const caralogado = req.loggedUser;
    const { newPhoneNumber } = req.body;

    if (!newPhoneNumber) {
      res.status(400).json({ "msg": "Forneça um novo número de telefone" });
      return;
    }

    const response = await userModel.changePhoneNumber(caralogado, newPhoneNumber);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async changeUsername(req, res) {
    const caralogado = req.loggedUser;
    const { newUsername } = req.body;

    if (!newUsername) {
      res.status(400).json({ "msg": "Forneça um novo nome de usuário" });
      return;
    }
    const response = await userModel.changeUsername(caralogado, newUsername);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

}
export default new UserController();
