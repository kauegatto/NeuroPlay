using NeuroPlay.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Core.IRepositories
{
    public interface IUserRepository
    {
        void Add(User newUser);
        bool Delete(string email);
        void FindByPK(string email);
        void FindPatients(string email);
        void FindAll();
        bool UserExists(string email);
        bool ValidateLogin(string email, string password);
        bool ChangeUsername(string loggedUser, string newUsername);
        bool ChangePhoneNumber( string loggedUser, string newPhoneNumber);
        bool ChangePassword(string loggedUser, string oldPassword, string newPassword);
    }
}
