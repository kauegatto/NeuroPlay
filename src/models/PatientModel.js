import dbConnection from '../db/DbConnection.js';
class PatientModel {
  async patientExists(login) {
    const query = 'SELECT * FROM paciente WHERE nm_login_paciente = ?;';
    /* aqui usamos um prepared statement, com o execute, logo também não ficamos vulneráveis à sql injection!
    http://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    */
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query, [login]);
      dbConnection.closeConnection(connection);
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
  async getPatientName(login) {
    const query = `call getNomePaciente('${login}')`;
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
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

  async createPatient(name, login, password, loggedUser) {
    if (await this.patientExists(login)) {
      return [400, { "msg": "Este login já está cadastrado na base de dados." }];
    }
    const query = `call inserirPaciente('${login}','${password}','${name}','${loggedUser}')`;
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
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

  async patientReport(email) {
    const query = `call relatorioPaciente('${email}')`;

    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
      if (!err) {
        return [200, { "msg": rows[0] }];
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

  async activityDetails(email) {

    const query = `call detalhesAtividade('${email}')`;
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
      if (!err) {
        return [200, { "msg": rows[0] }];
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

  async changePassword(emailPatient, newPassword) {

    if (newPassword.length < 3) {
      return [400, "Sua senha precisa ter ao menos 3 caracteres"];
    }

    const query = `CALL alterarSenhaPaciente('${emailPatient}', '${newPassword}');`;
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
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

  async changePatientName(emailPatient, newPatientname) {
    const query = `CALL alterarNomePaciente('${emailPatient}','${newPatientname}');`;
    try {
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
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
  async updatePatientData(patientLogin, loggedUser, newPassword, newUsername) {
    let isResponsible = 1; //alterar, ver se o cara logado tem permissao e pa
    if (!isResponsible) {
      return [401, { "msg": "Você não tem autorização para trocar dados de pacientes que não são seus" }];
    }
    try {
      const query = `CALL alterarDadosPaciente('${patientLogin}','${newPassword}','${newUsername}');`;
      const connection = await dbConnection.openConnection();
      const [rows, fields, err] = await connection.execute(query);
      dbConnection.closeConnection(connection);
      return [200, { "msg": "Dados alterados com sucesso" }];
    }
    catch (e) {
      console.log(e);
      return [500, { "msg": "Erro no banco" }];
    }
  }

}

export { PatientModel }