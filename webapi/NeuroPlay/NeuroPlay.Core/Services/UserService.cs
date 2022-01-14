using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Core.Services
{
    public class UserService
    {
        IUserRepository _userRepository { get; set; }

        public UserService(IUserRepository userRepository)
        {
            _userRepository=userRepository;
        }

        public User Add(User newUser)
        {
            try
            {
                if (!(newUser.password.Length>=6))
                {
                    Console.WriteLine("senha curta");
                    throw new Exception();
                }
                if (newUser.username == "Bolsonaro")
                {
                    Console.WriteLine("bolsonaro ");
                    throw new Exception();
                }
                _userRepository.Add(newUser);
                return newUser;
            }
            catch (Exception ex)
            {
                Console.WriteLine("DEU ERRO "+ex.Message);
                return null;
            }
        }
        public bool Delete(string email)
        {
            try
            {
                // if userExists 
                // if loggedUser is  = email
                return _userRepository.Delete(email);
            }
            catch (Exception)
            {
                return false;
            }

        }
        public bool ValidateLogin(string email, string password)
        {
            if (email == null || password == null)
            {
                throw new Exception();
            }
            return _userRepository.ValidateLogin(email, password);
        }
        public bool UserExists(string email)
        {
            if(email == null) { throw new Exception(); }
            return _userRepository.UserExists(email);   
        }
    }
}
