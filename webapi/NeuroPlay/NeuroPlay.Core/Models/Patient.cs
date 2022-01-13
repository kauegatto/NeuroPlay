using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeuroPlay.Core.Models
{
    internal class Patient
    {
        [Required]
        public string login { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string userEmail{ get; set; }


    }
}
