using MySql.Data.MySqlClient;
using NeuroPlay.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Data.Repositories.MySql
{
    public class MySQLPatientRepository : IPatientRepository
    {
        private readonly MySQLConfig _config;
        private readonly MySqlConnection _connection;
            
        public MySQLPatientRepository(MySQLConfig config)
        {
            _config=config;
            _connection = new MySqlConnection(_config.ConnectionString);
        }

        void IPatientRepository.Add()
        {
            
        }

        void IPatientRepository.Delete(string login)
        {
            throw new NotImplementedException();
        }

        void IPatientRepository.FindByPK(string login)
        {
            throw new NotImplementedException();
        }

        void IPatientRepository.Update()
        {
            throw new NotImplementedException();
        }
    }
}
