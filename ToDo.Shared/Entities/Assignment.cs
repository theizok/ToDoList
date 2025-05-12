using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.Shared.Entities
{
    public class Assignment
    {
        public int Id { get; set; }

        [Display(Name ="Nombre de la tarea")]
        [Required(ErrorMessage = "Campo requerido")]
        [MaxLength(100)]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Finished { get; set; }

        public bool IsCompleted { get; set; }

        public User? User{ get; set; }

        public int UserId { get; set; }

    }
}
