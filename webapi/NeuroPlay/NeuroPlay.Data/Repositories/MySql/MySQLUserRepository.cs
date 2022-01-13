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
    public class MySQLUserRepository : IUserRepository
    {
        private readonly MySQLConfig _config;
        private readonly MySqlConnection _connection;

        public MySQLUserRepository (MySQLConfig config)
        {
            _config=config;
            _connection = new MySqlConnection(_config.ConnectionString);
        }
        void IUserRepository.Add(User newUser)
        {
            try
            {
                _connection.Open();
                string sqlCommand = "insert into usuario values (@Email, @PhoneNumber, md5(@Password), @Username, 1);";
                MySqlCommand cmd = new MySqlCommand(sqlCommand, _connection);
                cmd.Parameters.AddWithValue("@Email", newUser.email);
                cmd.Parameters.AddWithValue("@PhoneNumber", newUser.phoneNumber);
                cmd.Parameters.AddWithValue("@Password", newUser.password);
                cmd.Parameters.AddWithValue("@Username", newUser.username);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;  //sei que isso aqui não é certo
            }
            _connection.Close();
            return;
        }

        void IUserRepository.Delete(string email)
        {
            throw new NotImplementedException();
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
    }
}
