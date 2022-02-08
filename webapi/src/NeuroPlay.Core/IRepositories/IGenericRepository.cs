namespace NeuroPlay.Core.IRepositories
{
  public interface IGenericRepository<T, TPk>
  where T : class
  {
    Result<T, string> FindByPk(TPk primaryKey);
    Result<T, string> Add(T entity);
    Result<T, string> Update(T entity);
    Result Delete(T entity);
  }
}