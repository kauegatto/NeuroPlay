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
  public class Result<TError> : Result
    where TError : class, IError
  {
    public TError Error { get; }
    public Result(bool succeded, TError error) : base(succeded)
    {
      Error = error;
    }
    public static new Result<TError> Ok()
    {
      return new Result<TError>(true, default(TError)); // default(TError) is null
    }
    public static Result<TError> Fail(TError error)
    {
      return new Result<TError>(false, error);
    }
  }
  public class Result<TData, TError> : Result
  where TData : class
  where TError : IError
  {
    public TData Data { get; }
    public TError Error { get; }
    public Result(bool succeded, TData data, TError error) : base(succeded)
    {
      Data = data;
      Error = error;
    }
    public static Result<TData, TError> Ok(TData data)
    {
      return new Result<TData, TError>(true, data, default(TError)); // default(TError) is null
    }
    public static Result<TData, TError> Fail(TError error)
    {
      return new Result<TData, TError>(false, default(TData), error); // default(TData) is null
    }
  }
}