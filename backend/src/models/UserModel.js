import { connection } from '../db/dbConnection';
class UserModel {
  async userExists(email) {
    const query = 'SELECT * FROM `paciente` WHERE `nm_login_paciente` = ?';
    let queryErrors, queryResults;
    let valid = 2;
    /* aqui usamos um prepared statement, com o execute, logo também não ficamos vulneráveis à sql injection!
    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    */
    const [rows, fields, err] = await connection.execute(query, [email]);
    if (rows && !err) {
      console.log('opa');
      return true;
    }
    else {
      return false;
    }
  }
}
export { UserModel }