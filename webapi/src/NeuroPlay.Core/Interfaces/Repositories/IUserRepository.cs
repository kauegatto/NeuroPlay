using NeuroPlay.Core.Models;


namespace NeuroPlay.Core.IRepositories
{
  public interface IUserRepository<TError>
    where TError : class, IError
  {
    Result<User, TError> FindByPk(string email);
    Result<User, TError> Add(User entity);
    Result<User, TError> Update(User updatedUser);
    Result Delete(string email);
    Result<ICollection<Patient>, TError> FindPatients(string email);
    Result<ICollection<User>, TError> FindAll();
    bool UserExists(string email);
    Result ValidateLogin(string email, string password);
    Result<User, TError> ChangeUsername(string loggedUser, string newUsername);
    Result<User, TError> ChangePhoneNumber(string loggedUser, string newPhoneNumber);
    Result<User, TError> ChangePassword(string loggedUser, string oldPassword, string newPassword);
  }
}
