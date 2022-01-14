using NeuroPlay.Core.IRepositories;
using NeuroPlay.Core.Services;
using NeuroPlay.Data;
using NeuroPlay.Data.Repositories.MySql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<MySQLConfig>(new MySQLConfig()
{
    ConnectionString = builder.Configuration.GetConnectionString("MySQL")
});
builder.Services.AddScoped<IUserRepository, MySQLUserRepository>();
builder.Services.AddScoped<IPatientRepository, MySQLPatientRepository>();
builder.Services.AddScoped<UserService>();


builder.Services.AddControllers();

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
