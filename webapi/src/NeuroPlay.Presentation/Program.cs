using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NeuroPlay.Core;
using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Services;
using NeuroPlay.Data;
using NeuroPlay.Data.Repositories.MySql;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<MySQLConfig>(new MySQLConfig()
{
    ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")
});

// injecting IError
builder.Services.AddScoped<IError, Error>();

builder.Services.AddScoped<IUserRepository<IError>, MySQLUserRepository>();
builder.Services.AddScoped<IPatientRepository<IError>, MySQLPatientRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddControllers()
  .ConfigureApiBehaviorOptions(options =>
  {
    options.SuppressModelStateInvalidFilter = true; //remove a validação de model automática do c#
  });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
