using System.ComponentModel.DataAnnotations;

namespace NeuroPlay.Core.Models
{
  public class Patient
  {
    public Patient(string login, string password, string username, string userEmail)
    {
      Login = login;
      Password = password;
      Username = username;
      UserEmail = userEmail;
    }
    [Required]
    [MaxLength(128, ErrorMessage = "{0} cannot be longer than {1} characters.")]
    [MinLength(4, ErrorMessage = "{0} cannot be shorter than {1} characters.")]
    public string Login { get; protected set; }
    [Required]
    [MaxLength(128, ErrorMessage = "{0} cannot be longer than {1} characters.")]
    [MinLength(8, ErrorMessage = "{0} cannot be shorter than {1} characters.")]
    public string Password { get; protected set; }
    [Required]
    [MaxLength(24, ErrorMessage = "{0} cannot be longer than {1} characters.")]
    public string Username { get; protected set; }
    [Required]
    [EmailAddress]
    public string UserEmail { get; protected set; }
  }
}