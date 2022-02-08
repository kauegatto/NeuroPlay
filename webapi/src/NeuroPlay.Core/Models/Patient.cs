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
    public string Login { get; protected set; }
    public string Password { get; protected set; }
    public string Username { get; protected set; }
    public string UserEmail { get; protected set; }
  }
}