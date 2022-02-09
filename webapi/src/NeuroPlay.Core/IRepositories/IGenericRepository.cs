namespace NeuroPlay.Core.IRepositories
{
  public interface IGenericRepository<T, TPk, TError>
  where T : class
  where TError : class, IError
  {
    Result<T, TError> FindByPk(TPk primaryKey);
    Result<T, TError> Add(T entity);
    Result<T, TError> Update(T entity);
    Result<TError> Delete(T entity);
  }
}