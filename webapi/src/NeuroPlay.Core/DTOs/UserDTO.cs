using System.ComponentModel.DataAnnotations;

namespace NeuroPlay.Core.DTOs
{
  public class UserDTO
  {
    public UserDTO(string email, string username, string phoneNumber)
    {
      Email = email;
      Username = username;
      PhoneNumber = phoneNumber;
    }
    [Required]
    [EmailAddress]
    public string Email { get; protected set; }
    [Required]
    [MinLength(4)]
    [MaxLength(24)]
    public string Username { get; protected set; }
    [Required]
    [MinLength(8)]
    [MaxLength(32)]
    public string PhoneNumber { get; protected set; }
  }
}