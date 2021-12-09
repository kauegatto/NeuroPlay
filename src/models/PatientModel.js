import dbConnection from '../db/DbConnection.js';
class PatientModel {
  async userCanManipulatePatient(responsibleEmail, patientLogin) {
    const query = `SELECT * FROM paciente WHERE nm_login_paciente = '${patientLogin}' AND nm_email_usuario = '${responsibleEmail}';`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
      if (rows[0] && !err) {
        return true;
      }
      else {
        console.log(rows[0]);
        console.log(err);
        return false;
      }
    }
    catch (e) {
      console.log(e);
      return false;
    }
  }
  async patientExists(login) {
    const query = `SELECT * FROM paciente WHERE nm_login_paciente = '${login}';`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
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
    const query = `CALL loginPaciente('${email}','${password}');`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
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

  async getPatientName(login) {
    const query = `call getNomePaciente('${login}')`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
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
      const [rows, err] = await dbConnection.executeQuery(query);
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
      const [rows, err] = await dbConnection.executeQuery(query);
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
      const [rows, err] = await dbConnection.executeQuery(query);
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

  async findAllFromUser(email) {
    const query = `call nomePaciente('${email}')`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
      if (!err) {
        if (rows[0][0]) {
          return [200, rows[0]];
        }
        else {
          return [200, { "msg": "Você ainda não tem pacientes cadastrados" }];
        }
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

  async changePassword(patientLogin, newPassword) {

    if (newPassword.length < 3) {
      return [400, "Sua senha precisa ter ao menos 3 caracteres"];
    }

    const query = `CALL alterarSenhaPaciente('${patientLogin}', '${newPassword}');`;
    try {
      const [rows, err] = await dbConnection.executeQuery(query);
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

  async changePatientName(patientLogin, newPatientname, loggedUser) {
    const query = `CALL alterarNomePaciente('${patientLogin}','${newPatientname}');`;
    try {
      if (!this.userCanManipulatePatient(loggedUser, patientLogin)) {
        return [401, { "msg": "Você não é o responsável por esse paciente" }];
      }
      const [rows, err] = await dbConnection.executeQuery(query);
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
    try {
      if (!this.userCanManipulatePatient(loggedUser, patientLogin)) {
        return [401, { "msg": "Você não é o responsável por esse paciente" }];
      }
      const query = `CALL alterarDadosPaciente('${patientLogin}','${newPassword}','${newUsername}');`;
      const [rows, err] = await dbConnection.executeQuery(query);
      return [200, { "msg": "Dados alterados com sucesso" }];
    }
    catch (e) {
      console.log(e);
      return [500, { "msg": "Erro no banco" }];
    }
  }
  async deletePatient(loggedUser, patientLogin) {
    const query = `delete from paciente where nm_login_paciente='${patientLogin}'`;
    try {
      if (!this.userCanManipulatePatient(loggedUser, patientLogin)) {
        return [401, { "msg": "Você não é o responsável por esse paciente" }];
      }
      const [rows, err] = await dbConnection.executeQuery(query);
      if (!err) {
        return [200, { "msg": "Paciente deletado com sucesso" }];
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

export { PatientModel }