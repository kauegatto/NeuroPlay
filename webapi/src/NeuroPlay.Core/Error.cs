using System.Collections.ObjectModel;

namespace NeuroPlay.Core
{
  public interface IError
  {
  }
  public class Error : ReadOnlyCollection<string>, IError
  {
    public Error(IList<string> list) : base(list)
    {
    }
    public Error(string error) : base(new List<string> { error })
    {
    }
    public Error() : base(new List<string>())
    {
    }
  }
}