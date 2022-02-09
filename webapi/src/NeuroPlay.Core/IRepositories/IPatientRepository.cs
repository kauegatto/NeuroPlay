using NeuroPlay.Core.Models;

namespace NeuroPlay.Core.IRepositories
{
  public interface IPatientRepository<TError>
  where TError : class, IError
  {
    Result<Patient, TError> FindByPk(string email);
    Result<Patient, TError> Add(Patient entity);
    Result<Patient, TError> Update(Patient updatedPatient);
    Result Delete(string email);
    bool UserCanManipulatePatient(String userEmail, string patientLogin);
    bool PatientExists(String login);
    Result<User, TError> GetPatient(String login);
    Result<string, TError> GetPatientName(String login);
    Result<string, TError> GetPatientRecords(String login);
    Result ChangePassword(string loggedPatient, string oldPassword, string newPassword);
  }
}
