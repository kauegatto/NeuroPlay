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
    const query = `CALL LOGINPACIENTE('${email}','${password}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      /* rows tem 2 array: 1-> array dos resultados, json dentro, 2-> array de info do bd*/
      /* aqui, se a gente valida com rows[0] ele vai pegar o array vazio de json, então vai considerar que não é vazio pq tem um array vazio dentro!*/
      /* por isso a validação aqui é usando rows[0][0], mas acho que no primeiro caso nao tem 2 retornos por causa do placeholder, nao sei ainda*/
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
      return [400, { "erro": "esse usuario já está cadastrado" }];
    }
    if (password.length < 8) {
      return [400, "Sua senha precisa ter 8 caracteres"];
    }
    const query = `CALL inserirUsuario('${email}','${password}','${phoneNumber}','${username}');`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "usuario criado" }];
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

export { UserModel }