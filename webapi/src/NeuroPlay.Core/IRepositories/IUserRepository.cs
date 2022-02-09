using NeuroPlay.Core.Models;


namespace NeuroPlay.Core.IRepositories
{
  public interface IUserRepository<TError>
  where TError : class, IError
  {
    Result<User, TError> Add(User newUser); // retornar mensagens de erro relacionadas à validação
    Result<TError> Delete(string email); // avisa somente se deu certo ou não, a única maneira de isso dar errado é se não existe permissão para a deleção
    Result<User, TError> FindByPK(string email);
    Result<ICollection<Patient>, TError> FindPatients(string email);
    Result<ICollection<User>, TError> FindAll();
    bool UserExists(string email);
    Result ValidateLogin(string email, string password);
    Result<User, TError> ChangeUsername(string loggedUser, string newUsername);
    Result<User, TError> ChangePhoneNumber(string loggedUser, string newPhoneNumber);
    Result<User, TError> ChangePassword(string loggedUser, string oldPassword, string newPassword);
  }
}
