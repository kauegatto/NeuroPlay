using NeuroPlay.Core.Models;

namespace NeuroPlay.Core.IRepositories
{
  public interface IPatientRepository
  {
    Result<User, string> Add(Patient newPatient);
    Result<User, string> Update(string loggedPatient, Patient updatedData);
    Result Delete(String login);
    Result<User, string> FindByPK(String login);
    bool UserCanManipulatePatient(String userEmail, string patientLogin);
    bool PatientExists(String login);
    Result<User, string> GetPatient(String login);
    Result<string, string> GetPatientName(String login);
    Result<string, string> GetPatientRecords(String login);
    Result ChangePassword(string loggedPatient, string oldPassword, string newPassword);
  }
}
