using MySql.Data.MySqlClient;
using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Models;
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


        void IPatientRepository.Add(Patient newPatient)
        {
            throw new NotImplementedException();
        }

        void IPatientRepository.ChangePassword(string loggedPatient, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        void IPatientRepository.Delete(string login)
        {
            throw new NotImplementedException();
        }

        Patient IPatientRepository.FindByPK(string login)
        {
            throw new NotImplementedException();
        }

        Patient IPatientRepository.GetPatient(string login)
        {
            throw new NotImplementedException();
        }

        string IPatientRepository.GetPatientName(string login)
        {
            throw new NotImplementedException();
        }

        string IPatientRepository.GetPatientRecords(string login)
        {
            throw new NotImplementedException();
        }

        bool IPatientRepository.PatientExists(string login)
        {
            throw new NotImplementedException();
        }


        Patient IPatientRepository.Update(string loggedPatient, Patient updatedData)
        {
            throw new NotImplementedException();
        }

        bool IPatientRepository.UserCanManipulatePatient(string userEmail, string patientLogin)
        {
            throw new NotImplementedException();
        }
    }
}
