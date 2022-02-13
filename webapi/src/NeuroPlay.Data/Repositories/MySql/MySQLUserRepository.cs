using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Models;
using MySql.Data.MySqlClient;
using NeuroPlay.Core;

namespace NeuroPlay.Data.Repositories.MySql
{
  public class MySQLUserRepository : IUserRepository<IError>, IDisposable
  {
    #region Fields, Properties and Constructor
    private readonly MySQLConfig _config;
    private readonly MySqlConnection _connection;

    public MySQLUserRepository(MySQLConfig config)
    {
      _config = config;
      _connection = new MySqlConnection(_config.ConnectionString);
    }
    #endregion
    public void Dispose()
    {
      _connection.Close(); // this repository is injected as scoped so we don't need to close it after every method call
    }
    public void OpenConnection()
    {
      if (_connection.State == System.Data.ConnectionState.Closed)
        _connection.Open();
    }
    #region Add,Find,Update,Delete
    public Result<User, IError> Add(User newUser)
    {
      OpenConnection();
      string sqlCommand = "insert into usuario values (@Email, @PhoneNumber, md5(@Password), @Username, 1);";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Email", newUser.Email);
      cmd.Parameters.AddWithValue("@PhoneNumber", newUser.PhoneNumber);
      cmd.Parameters.AddWithValue("@Password", newUser.Password);
      cmd.Parameters.AddWithValue("@Username", newUser.Username);
      cmd.ExecuteNonQuery();
      //exceptions will be catch on controllers and return internal server error
      return Result<User, IError>.Ok(newUser);
    }
    public Result<User, IError> FindByPk(string email)
    {
      OpenConnection();
      string sqlCommand = "select * from usuario where nm_email_usuario = @Email;";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Email", email);
      MySqlDataReader reader = cmd.ExecuteReader();
      if (reader.Read())
      {
        var user = new User(
          reader.GetString("nm_email_usuario"),
          reader.GetString("cd_telefone_usuario"),
          reader.GetString("nm_senha_usuario"),
          reader.GetString("nm_usuario")
        );
        reader.Close();
        return Result<User, IError>.Ok(user);
      }
      reader.Close();
      return Result<User, IError>.Fail(new Error("User not found"));
    }
    public Result<ICollection<User>, IError> FindAll()
    {
      OpenConnection();
      throw new NotImplementedException();
    }
    public Result<User, IError> Update(User updatedUser)
    {
      OpenConnection();
      throw new NotImplementedException();
    }
    public Result Delete(string email)
    {
      OpenConnection();
      if (email == null)
      {
        return Result.Fail();
      }
      // if logged user != email, return fail
      string sqlCommand = "DELETE from usuario where nm_email_usuario @Username";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Username", email);
      cmd.ExecuteNonQuery();
      return Result.Ok();
    }
    #endregion
    public Result ValidateLogin(string email, string password)
    {
      OpenConnection();
      if (email == null || password == null)
      {
        return Result.Fail();
      }

      bool hasRows;
      string sqlCommand = "Select * from usuario where nm_email_usuario = @Email and nm_senha_usuario = md5(@Password)";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Email", email);
      cmd.Parameters.AddWithValue("@Password", password);
      MySqlDataReader reader = cmd.ExecuteReader();
      reader.Read();
      hasRows = reader.HasRows;
      reader.Close();
      if (hasRows)
      {
        return Result.Ok();
      }
      else { return Result.Fail(); }
    }
    bool UserExists(string email)
    {
      OpenConnection();
      bool hasRows;
      string sqlCommand = "Select * from usuario where nm_email_usuario = @Email";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Email", email);
      MySqlDataReader reader = cmd.ExecuteReader();
      reader.Read();
      hasRows = reader.HasRows;
      reader.Close();
      return hasRows;
    }
    public Result<ICollection<Patient>, IError> FindPatients(string email)
    {
      OpenConnection();
      throw new NotImplementedException();
    }
    bool IUserRepository<IError>.UserExists(string email)
    {
      OpenConnection();
      if (email == null)
        return false;
      bool hasRows;

      string sqlCommand = "Select * from usuario where nm_email_usuario = @Email";
      MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
      cmd.Parameters.AddWithValue("@Email", email);
      MySqlDataReader reader = cmd.ExecuteReader();
      reader.Read();
      hasRows = reader.HasRows;
      reader.Close();

      if (hasRows)
        return true;
      else
        return false;
    }
    public Result<User, IError> ChangeUsername(string loggedUser, string newUsername)
    {
      OpenConnection();
      throw new NotImplementedException();
    }
    public Result<User, IError> ChangePhoneNumber(string loggedUser, string newPhoneNumber)
    {
      OpenConnection();
      throw new NotImplementedException();
    }
    public Result<User, IError> ChangePassword(string loggedUser, string oldPassword, string newPassword)
    {
      OpenConnection();
      throw new NotImplementedException();
    }
  }
}
