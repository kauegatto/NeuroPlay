import { connection } from '../db/dbConnection';
class UserModel {
  async userExists(email) {
    const query = 'SELECT * FROM usuario WHERE nm_email_usuario = ?;';
    /* aqui usamos um prepared statement, com o execute, logo também não ficamos vulneráveis à sql injection!
    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    */
    try {
      const [rows, fields, err] = await connection.execute(query, [email]);
      if (rows[0] && !err) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }
  async validateLogin(email, password) {
    const query = `CALL LoginUsuario('${email}','${password}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      /* rows 0;0 é p pegar exatamente os dados do primeiro resultado dos resultados, mas como só tem 1, vai dar certo*/
      if (rows[0][0] && !err) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (e) {
      return false;
    }
  }
  async createUser(email, password, phoneNumber, username) {
    if (await this.userExists(email)) {
      return [400, { "msg": "esse usuario já está cadastrado" }];
    }
    if (password.length < 8) {
      return [400, "Sua senha precisa ter ao menos 3 caracteres"];
    }
    const query = `CALL inserirUsuario('${email}','${password}','${phoneNumber}','${username}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "usuario criado" }];
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

  async changePassword(loggedUser, oldPassword, newPassword) {
    if (!await this.validateLogin(loggedUser, oldPassword)) {
      return [400, "Sua senha antiga está incorreta"];
    }
    if (newPassword.length < 3) {
      return [400, "Sua senha precisa ter ao menos 3 caracteres"];
    }
    const query = `CALL alterarSenhaUsuario('${loggedUser}','${newPassword}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "Senha alterada com sucesso" }];
      }
      else {
        return [500, { "msg": "Erro!" }];
      }
    }
    catch (e) {
      console.log(e);
      return [500, { "msg": "Erro no banco" }];
    }
  }

  async changePhoneNumber(loggedUser, newPhoneNumber) {
    const query = `CALL alterarTelefoneUsuario('${loggedUser}','${newPhoneNumber}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "Número de telefone sucesso" }];
      }
      else {
        return [500, { "msg": "Erro!" }];
      }
    }
    catch (e) {
      console.log(e);
      return [500, { "msg": "Erro no banco" }];
    }
  }
  
  async changeUsername(loggedUser, newUsername) {
    const query = `CALL alterarNomeUsuario('${loggedUser}','${newUsername}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "Nome de usuário alterado com sucesso" }];
      }
      else {
        return [500, { "msg": "Erro!" }];
      }
    }
    catch (e) {
      console.log(e);
      return [500, { "msg": "Erro no banco" }];
    }
  }
}

export { UserModel }