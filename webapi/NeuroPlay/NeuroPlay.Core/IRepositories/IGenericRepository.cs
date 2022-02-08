namespace NeuroPlay.Core.IRepositories
{
  public interface IGenericRepository<T, TPk>
  {
    Result FindByPk(TPk primaryKey);
    Result Add(T entity);
    Result Update(T entity);
    Result Delete(T entity);
  }
}