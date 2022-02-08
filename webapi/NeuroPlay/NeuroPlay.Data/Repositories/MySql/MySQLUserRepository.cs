using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Models;
using MySql.Data.MySqlClient;
namespace NeuroPlay.Data.Repositories.MySql
{
  public class MySQLUserRepository : IUserRepository, IDisposable
  {
    private readonly MySQLConfig _config;
    private readonly MySqlConnection _connection;

    public MySQLUserRepository(MySQLConfig config)
    {
      _config = config;
      _connection = new MySqlConnection(_config.ConnectionString);
      _connection.Open();
    }

    public void Dispose()
    {
      _connection.Close();
    }

    void IUserRepository.Add(User newUser)
    {
      try
      {
        _connection.Open();
        string sqlCommand = "insert into usuario values (@Email, @PhoneNumber, md5(@Password), @Username, 1);";
        MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
        cmd.Parameters.AddWithValue("@Email", newUser.Email);
        cmd.Parameters.AddWithValue("@PhoneNumber", newUser.PhoneNumber);
        cmd.Parameters.AddWithValue("@Password", newUser.Password);
        cmd.Parameters.AddWithValue("@Username", newUser.Username);
        cmd.ExecuteNonQuery();
      }
      catch (Exception ex)
      {
        throw ex;  //sei que isso aqui não é certo
      }
      _connection.Close();
      return;
    }

    bool IUserRepository.ChangePassword(string loggedUser, string oldPassword, string newPassword)
    {
      throw new NotImplementedException();
    }

    bool IUserRepository.ChangePhoneNumber(string loggedUser, string newPhoneNumber)
    {
      throw new NotImplementedException();
    }

    bool IUserRepository.ChangeUsername(string loggedUser, string newUsername)
    {
      throw new NotImplementedException();
    }

    bool IUserRepository.Delete(string email)
    {
      try
      {
        _connection.Open();
        string sqlCommand = "DELETE from usuario where nm_email_usuario @Username";
        MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
        cmd.Parameters.AddWithValue("@Username", email);
        cmd.ExecuteNonQuery();
      }
      catch (Exception ex)
      {
        return false;
      }
      _connection.Close();
      return true;
    }

    void IUserRepository.FindAll()
    {
      throw new NotImplementedException();
    }

    void IUserRepository.FindByPK(string email)
    {
      throw new NotImplementedException();
    }

    void IUserRepository.FindPatients(string email)
    {
      throw new NotImplementedException();
    }

    bool IUserRepository.UserExists(string email)
    {
      try
      {
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
      catch (Exception ex)
      {
        throw ex;  //sei que isso aqui não é certo
      }
    }

    bool IUserRepository.ValidateLogin(string email, string password)
    {
      try
      {
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
          return true;
        }
        else { return false; }
      }
      catch (Exception ex)
      {
        throw ex;  //sei que isso aqui não é certo
      }

    }
  }
}
