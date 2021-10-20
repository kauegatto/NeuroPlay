import { connection } from '../db/dbConnection';
class UserModel {
  async userExists(email) {
    const query = 'SELECT * FROM paciente WHERE nm_login_paciente = ?;';
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
    let valid = 2;
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
      console.log(e);
      return false;
    }
  }
}
export { UserModel }