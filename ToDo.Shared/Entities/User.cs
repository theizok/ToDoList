using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace ToDo.Shared.Entities
{
    public class User
    {
        public int Id { get; set; }


        [Display(Name = "Correo del Usuario")]
        [Required]
        [MaxLength(256)]

        public string Email { get; set; }

        public string Password { get; set; }

        public List<Assignment> Assignments { get; set; }

    }
}
