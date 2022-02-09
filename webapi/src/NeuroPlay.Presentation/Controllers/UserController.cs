using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using NeuroPlay.Core.IRepositories;
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

    [HttpGet]
    public IActionResult Get()
    {
      return new string[] { "value1", "value2" };
    }

    // [GET] /User/5
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      return "value";
    }
    [HttpPost]
    public IActionResult Post(User newUser)
    {
      try
      {
        var result = _userService.Add(newUser);
        if (result.Succeded)
        {
          return Ok(result.Data);
        }
        else
        {
          return BadRequest(result.Error);
        }
      }
      catch (MySqlException ex)
      {
        Debug.WriteLine(ex);
        return StatusCode(500, "Internal Server Error");
      }

    }
    // PUT api/<UserController>/5
    [HttpPut("{id}")]
    public IActionResult Put(User newUser)
    {
    }

    // DELETE api/<UserController>/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
    }
  }
}
