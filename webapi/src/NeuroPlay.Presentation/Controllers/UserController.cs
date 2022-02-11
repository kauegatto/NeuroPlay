using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using NeuroPlay.Core.DTOs;
using NeuroPlay.Core.Models;
using NeuroPlay.Core.Services;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeuroPlay.Presentation.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
      _userService = userService;
    }

    //FromBody is necessary since it doesn't infer primitives like int or string
    // see type inference in https://docs.microsoft.com/pt-br/aspnet/core/web-api/?view=aspnetcore-6.0#binding-source-parameter-inference

    [HttpGet]
    public ActionResult<UserDTO> Get(
     [FromQuery] string email)
    {
      try
      {
        var result = _userService.FindByPk(email);
        if (result.Succeded)
        {
          return Ok(result.Data.Map());//result.Data is always a User, which has the Map method, which returns a DTO
        }
        else
        {
          return BadRequest(result.Error);
        }
      }
      catch (Exception ex)
      {
        Debug.WriteLine("Server Error: " + ex.Message);
        Console.WriteLine("Server Error: " + ex.Message);
        return StatusCode(500, "Internal server error");
      }
    }

    [HttpPost]
    public ActionResult<UserDTO> Post(
      [FromBody] User newUser)
    {
      #region try
      try
      {
        var result = _userService.Add(newUser);
        if (result.Succeded)
        {
          return StatusCode(201, result.Data.Map()); //result.Data is always a User, which has the Map method, that returns a DTO
        }
        else
        {
          return BadRequest(result.Error);
        }
      }
      #endregion
      catch (Exception ex)
      {
        Debug.WriteLine(ex);
        return StatusCode(500, "Internal Server Error"); // 500 Internal Server Error;
      }

    }

    // PUT api/<UserController>/5
    [HttpPut("{id}")]
    public IActionResult Put(User newUser)
    {
      throw new NotImplementedException();
    }

    // DELETE api/<UserController>/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      throw new NotImplementedException();
    }
  }
}
