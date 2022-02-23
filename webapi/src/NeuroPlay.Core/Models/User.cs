using System.ComponentModel.DataAnnotations;
using NeuroPlay.Core.DTOs;

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
    [Required]
    [MaxLength(128)]
    [EmailAddress]
    public string Email { get; protected set; }
    [Required]
    [MinLength(8)]
    [MaxLength(128)]
    public string Password { get; protected set; }
    [Required]
    [MinLength(4)]
    [MaxLength(128)]
    public string Username { get; protected set; }
    [Required]
    [Phone]
    [MinLength(10)]
    [MaxLength(32)]
    public string PhoneNumber { get; protected set; }
    [Required]
    public int UserType { get; protected set; }

    public UserDTO ToUserDTO()
    {
      return new UserDTO(Email, Username, PhoneNumber);
    }
  }
}