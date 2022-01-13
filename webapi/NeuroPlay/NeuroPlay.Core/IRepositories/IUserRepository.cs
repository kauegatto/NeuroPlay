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
        void Delete(string email);
        void FindByPK(string email);
        void FindPatients(string email);
        void FindAll();
    }
}
