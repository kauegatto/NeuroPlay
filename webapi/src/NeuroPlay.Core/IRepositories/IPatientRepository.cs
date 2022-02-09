using NeuroPlay.Core.Models;

namespace NeuroPlay.Core.IRepositories
{
  public interface IPatientRepository<TError>
  where TError : class, IError
  {
    Result<User, TError> Add(Patient newPatient);
    Result<User, TError> Update(string loggedPatient, Patient updatedData);
    Result Delete(String login);
    Result<User, TError> FindByPK(String login);
    bool UserCanManipulatePatient(String userEmail, string patientLogin);
    bool PatientExists(String login);
    Result<User, TError> GetPatient(String login);
    Result<string, TError> GetPatientName(String login);
    Result<string, TError> GetPatientRecords(String login);
    Result ChangePassword(string loggedPatient, string oldPassword, string newPassword);
  }
}
