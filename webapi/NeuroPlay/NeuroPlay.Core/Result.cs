namespace NeuroPlay.Core
{
  public interface IResult
  {
    public bool Succeded { get; }
    public bool Failed { get; }
  }
  public class Result : IResult
  {
    public bool Succeded { get; }
    public bool Failed => !Succeded;
    public Result(bool succeded)
    {
      Succeded = succeded;
    }
    public static Result Ok()
    {
      return new Result(true);
    }
    public static Result Fail()
    {
      return new Result(false);
    }
  }
  public class Result<TData> : Result
    where TData : class
  {
    public TData Data { get; }
    public Result(bool succeded, TData data) : base(succeded)
    {
      Data = data;
    }
    public static Result<TData> Ok(TData data)
    {
      return new Result<TData>(true, data);
    }
    public static Result<TData> Fail()
    {
      return new Result<TData>(false, null);
    }
  }

  public class Result<TData, TError> : Result<TData>
  where TData : class
  {
    public TError Error { get; }
    public Result(bool succeded, TData data, TError error) : base(succeded, data)
    {
      Error = error;
    }
    public static Result<TData, TError> Ok(TData data, TError error)
    {
      return new Result<TData, TError>(true, data, error);
    }
    public static Result<TData, TError> Fail(TError error)
    {
      return new Result<TData, TError>(false, null, error);
    }
  }
}