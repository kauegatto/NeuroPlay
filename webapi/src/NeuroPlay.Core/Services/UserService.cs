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
    IUserRepository<IError> _userRepository { get; set; }
    public UserService(IUserRepository<IError> userRepository)
    {
      _userRepository = userRepository;
    }
    public Result<User, IError> Add(User newUser)
    {
      List<string> errors = new List<string>();
      if (newUser.Email == null || newUser.Password == null)
      {
        errors.Add("Email and password are required");
      }
      else
      {
        if (newUser.Email.Length < 3 || newUser.Password.Length < 3)
          errors.Add("Email and password must have at least 3 characters");
        if (UserExists(newUser.Email))
          errors.Add("User already exists");
      }
      if (errors.Count > 0)
      {
        return Result<User, IError>.Fail(new Error(errors));
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
      if (email == null)
        return false;
      return _userRepository.UserExists(email);
    }
  }
}
