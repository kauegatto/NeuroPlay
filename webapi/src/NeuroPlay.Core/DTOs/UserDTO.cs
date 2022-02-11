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

    public string Email { get; protected set; }
    public string Username { get; protected set; }
    public string PhoneNumber { get; protected set; }
  }
}