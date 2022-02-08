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
  public class MySQLPatientRepository : IPatientRepository, IDisposable
  {
    private readonly MySQLConfig _config;
    private readonly MySqlConnection _connection;


    public MySQLPatientRepository(MySQLConfig config)
    {
      _config = config;
      _connection = new MySqlConnection(_config.ConnectionString);
      _connection.Open();
    }
    public void Dispose()
    {
      _connection.Close();
    }

    public Result<User, string> Add(Patient newPatient)
    {
      throw new NotImplementedException();
    }

    public Result ChangePassword(string loggedPatient, string oldPassword, string newPassword)
    {
      throw new NotImplementedException();
    }

    public Result Delete(string login)
    {
      throw new NotImplementedException();
    }



    public Result<User, string> FindByPK(string login)
    {
      throw new NotImplementedException();
    }

    public Result<User, string> GetPatient(string login)
    {
      throw new NotImplementedException();
    }

    public Result<string, string> GetPatientName(string login)
    {
      throw new NotImplementedException();
    }

    public Result<string, string> GetPatientRecords(string login)
    {
      throw new NotImplementedException();
    }

    public bool PatientExists(string login)
    {
      throw new NotImplementedException();
    }

    public Result<User, string> Update(string loggedPatient, Patient updatedData)
    {
      throw new NotImplementedException();
    }

    public bool UserCanManipulatePatient(string userEmail, string patientLogin)
    {
      throw new NotImplementedException();
    }
  }
}
