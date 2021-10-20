import User from '../models/User';

class UserController {
  // find all
  async findAll(req, res) {
    // needs to be an admin ( not like they wouldn't be able to map since it's an auto-incremented)
    try {
      const loggedUser = await User.findByPk(req.userId); // cause token may be outdaded.
      if (loggedUser.isAdmin()) {
        const users = await User.findAll({
          attributes: ['id', 'name', 'email', 'phoneNumber', 'typeId'],
        });
        res.json(users);
        return;
      }

      res.status(401).json({ errors: ['You need to be an admin in order to realize this action'] });
    } catch (e) {
      res.send('error');
    }
  }

  // create
  async create(req, res) {
    const userData = req.body;
    if (!userData.typeId) { userData.typeId = 1; }
    // if there's no specified typeId, it's a student (unsafe for now, later we'll get an token )
    try {
      await User.create(userData).then((user) => {
        res.status(200);
        res.json(user);
      });
    } catch (e) {
      // eslint-disable-next-line prefer-const
      let msgArray = [];
      const errorArray = e.errors;
      if (errorArray) { // if it's an error that comes from sequelize validation
        errorArray.forEach((error) => {
          msgArray.push(error.message);
        });
        res.status(400);
        res.send(msgArray);
      } else {
        res.status(400);
        res.json('voce:fdp');
      }
    }
  }

  // find one - read
  async findOne(req, res) {
    // theoretically any user can see this information as long they're logged in.
    // at least if you treat this system as a bizarre facebook or smth.
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id },
        attributes: ['name', 'email', 'phoneNumber'],
      });
      if (!user) { res.status(200).json({ message: 'no user found with this id' }); return; }
      res.json(user);
    } catch (e) {
      res.send('error');
    }
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
}
export default new UserController();
