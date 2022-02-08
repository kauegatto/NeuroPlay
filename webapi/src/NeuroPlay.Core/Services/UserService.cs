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
      _userRepository = userRepository;
    }
    public Result<User, string> Add(User newUser)
    {
      if (newUser.Email == null || newUser.Password == null)
      {
        return Result<User, string>.Fail("Login or password cannot be null");
      }
      if (newUser.Email.Length < 3 || newUser.Password.Length < 3)
      {
        return Result<User, string>.Fail("Login or password cannot be less than 3 characters");
      }
      return _userRepository.Add(newUser);
    }
    public Result Delete(string email)
    {
      if (email == null)
      {
        return Result.Fail();
      }
      return _userRepository.Delete(email);
    }
    public Result ValidateLogin(string email, string password)
    {
      if (email == null || password == null)
      {
        return Result.Fail();
      }
      return _userRepository.ValidateLogin(email, password);
    }
    public bool UserExists(string email)
    {
      if (email == null) { throw new Exception(); }
      return _userRepository.UserExists(email);
    }
  }
}
