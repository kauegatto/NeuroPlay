using NeuroPlay.Core.Models;


namespace NeuroPlay.Core.IRepositories
{
  public interface IUserRepository
  {
    Result<User, string> Add(User newUser); // retornar mensagens de erro relacionadas à validação
    Result Delete(string email); // avisa somente se deu certo ou não, a única maneira de isso dar errado é se não existe permissão para a deleção
    Result<User, string> FindByPK(string email);
    Result<ICollection<Patient>, string> FindPatients(string email);
    Result<ICollection<User>, string> FindAll();
    bool UserExists(string email);
    Result ValidateLogin(string email, string password);
    Result<User, string> ChangeUsername(string loggedUser, string newUsername);
    Result<User, string> ChangePhoneNumber(string loggedUser, string newPhoneNumber);
    Result<User, string> ChangePassword(string loggedUser, string oldPassword, string newPassword);
  }
}
