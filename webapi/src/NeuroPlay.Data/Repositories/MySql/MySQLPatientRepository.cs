using MySql.Data.MySqlClient;
using NeuroPlay.Core;
using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Data.Repositories.MySql
{
  public class MySQLPatientRepository : IPatientRepository<IError>, IDisposable
  {
    private readonly MySQLConfig _config;
    private readonly MySqlConnection _connection;


    public MySQLPatientRepository(MySQLConfig config)
    {
      _config = config;
      _connection = new MySqlConnection(_config.ConnectionString);
      _connection.Open();
    }

    public Result<Patient, IError> Add(Patient entity)
    {
      throw new NotImplementedException();
    }

    public Result ChangePassword(string loggedPatient, string oldPassword, string newPassword)
    {
      throw new NotImplementedException();
    }

    public Result Delete(string email)
    {
      throw new NotImplementedException();
    }

    public void Dispose()
    {
      _connection.Close();
    }

    public Result<Patient, IError> FindByPk(string email)
    {
      throw new NotImplementedException();
    }

    public Result<User, IError> GetPatient(string login)
    {
      throw new NotImplementedException();
    }

    public Result<string, IError> GetPatientName(string login)
    {
      throw new NotImplementedException();
    }

    public Result<string, IError> GetPatientRecords(string login)
    {
      throw new NotImplementedException();
    }

    public bool PatientExists(string login)
    {
      throw new NotImplementedException();
    }

    public Result<Patient, IError> Update(Patient updatedPatient)
    {
      throw new NotImplementedException();
    }

    public bool UserCanManipulatePatient(string userEmail, string patientLogin)
    {
      throw new NotImplementedException();
    }
  }
}
