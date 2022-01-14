using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Core.Models
{
    public class User
    {
        [Required]
        public string email { get; set; }
        [Required]
        [MinLength(6)]
        public string password { get; set; }
        [Required]
        public string username { get; set; }
        public string phoneNumber { get; set; }
        public int userType { get; set; }
    }
}
