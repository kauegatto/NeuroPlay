using NeuroPlay.Core.Models;

namespace NeuroPlay.Core.IRepositories
{
    public interface IPatientRepository
    {
        void Add(Patient newPatient);
        Patient Update(string loggedPatient,Patient updatedData);
        void Delete(String login);
        Patient FindByPK(String login);
        bool UserCanManipulatePatient(String userEmail, string patientLogin);
        bool PatientExists( String login);
        Patient GetPatient(String login);
        string GetPatientName ( String login);   
        string GetPatientRecords(String login);
        void ChangePassword(string loggedPatient, string oldPassword, string newPassword);
    }
}
