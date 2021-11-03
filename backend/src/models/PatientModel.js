import { connection } from '../db/dbConnection';
class PatientModel {
  async patientExists(login) {
    const query = 'SELECT * FROM paciente WHERE nm_login_paciente = ?;';
    /* aqui usamos um prepared statement, com o execute, logo também não ficamos vulneráveis à sql injection!
    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    */
    try {
      const [rows, fields, err] = await connection.execute(query, [login]);
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
  async findAllFromUser(email) {
    const query = `call nomePaciente('${email}')`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, rows[0]];
      }
      else {
        return [400, { "msg": "Erro no banco" }];
      }
    }
    catch (e) {
      console.log(e);
      return [400, { "msg": "Erro no banco" }];
    }
  }

  async createPatient(name, login, password, loggedUser) {
    if (await this.patientExists(login)) {
      return [400, { "msg": "Este login já está cadastrado na base de dados." }];
    }
    const query = `call inserirPaciente('${login}','${password}','${name}','${loggedUser}')`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, { "msg": "Paciente criado com sucesso" }];
      }
      else {
        return [400, { "msg": "Erro no banco" }];
      }
    }
    catch (e) {
      console.log(e);
      return [400, { "msg": "Erro no banco" }];
    }
  }
}

export { PatientModel }