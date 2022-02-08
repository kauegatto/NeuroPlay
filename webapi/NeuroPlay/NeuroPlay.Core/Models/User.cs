using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Core.Models
{
  public class User
  {
    public User(string email, string password, string username, string phonenumber)
    {
      Email = email;
      Password = password;
      Username = username;
      PhoneNumber = phonenumber;
      UserType = 1;
    }
    public string Email { get; protected set; }
    public string Password { get; protected set; }
    public string Username { get; protected set; }
    public string PhoneNumber { get; protected set; }
    public int UserType { get; protected set; }
  }
}
