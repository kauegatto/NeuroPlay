using NeuroPlay.Core.Services;
using NeuroPlay.Data;
using NeuroPlay.Data.Repositories.MySql;
using NUnit.Framework;

namespace NeuroPlay.Test
{
    public class UserServiceTests
    {
        private UserService userService;

        public UserServiceTests()
        {
            var config = new MySQLConfig() { ConnectionString = "server=localhost;user=root;password=root;database=prjtdah" };
            var mysqlrepo = new MySQLUserRepository(config);
            userService = new UserService(mysqlrepo);
        }


        [TestCase("pedro@gmail.com", "123", true)]
        [TestCase("julio@hotmail.com", "123", true)]
        [TestCase("pedro@gmail.com", "pedrofoda", false)]
        [TestCase("pedro@hotmail.com", "pedrofoda", false)]
        public void ValidateLogin( string email, string password, bool shouldLogin)
        {
            bool result = userService.ValidateLogin(email,password);
            if (shouldLogin)
            {
                Assert.IsTrue(result);
            }
            else
            {
                Assert.IsFalse(result);
            }
        }
        [TestCase("pedro@gmail.com",true)]
        [TestCase("pedro@hotmail.com", false)]
        public void UserExists (string email, bool shouldPass){
            bool result = userService.UserExists(email);
            if (shouldPass){
                Assert.IsTrue(result);
            }
            else
            {
                Assert.IsFalse(result);
            }
        }
    }
}