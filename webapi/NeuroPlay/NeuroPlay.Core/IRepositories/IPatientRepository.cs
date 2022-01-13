namespace NeuroPlay.Core.IRepositories
{
    public interface IPatientRepository
    {
        void Add();
        void Update();
        void Delete(String login);
        void FindByPK(String login);
    }
}
