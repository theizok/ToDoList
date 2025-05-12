using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.API.Data;
using ToDo.Shared.Entities;

namespace ToDo.API.Controllers
{
    [ApiController]
    [Route("api/assignment")]
    public class AssignementsController : Controller
    {
        public readonly DataContext _context;
        public AssignementsController(DataContext context) {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post(Assignment assignment)
        {
            try
            {
                Console.WriteLine($"Received assignment: {System.Text.Json.JsonSerializer.Serialize(assignment)}");

                var userId = User.FindFirst("id")?.Value;

                if (userId == null)
                {
                    return Unauthorized("User ID not found in token.");
                }

                //Busqueda del usuario
                var user = await _context.Users.FindAsync(int.Parse(userId));

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                //Id de usuario del jwt
                assignment.UserId = int.Parse(userId);
                

                //Asignacion de horas
                if (assignment.Created == default(DateTime))
                {
                    assignment.Created = DateTime.Now; 
                }

                Console.WriteLine(assignment);
                _context.Assignments.Add(assignment);
                await _context.SaveChangesAsync();
                return Ok(assignment);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error detallado: {ex.ToString()}");
                return BadRequest($"Error al crear tarea: {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> Get() {
            try 
            {
                var userId = int.Parse(User.FindFirst("id")?.Value);
                var tareas = await _context.Assignments.Where(x => x.UserId == userId).ToListAsync();
                return Ok(tareas);
            } 
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, Assignment assignment)
        {
  
            if (id != assignment.Id)
                return BadRequest("El ID de la URL no coincide con el ID del cuerpo");

            try
            {
               
                assignment.Finished = DateTime.Now;

                
                _context.Update(assignment);
                await _context.SaveChangesAsync();

                return Ok(assignment); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id) {
            try 
            {
                var AffectedRows = await _context.Assignments.Where(x => x.Id == id).ExecuteDeleteAsync();

                if (AffectedRows == 0)
                {
                    return NotFound();
                }
                return NoContent();
            } 
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
