import { connection } from '../db/dbConnection';
class PatientModel {
  async findAllFromUser(email) {
    const query = `call nomePaciente('${email}')`;
    try {
      const [rows, fields, err] = await connection.execute(query);
      if (!err) {
        return [200, rows[0][0]];
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