using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ToDo.API.Data;
using ToDo.Shared.DTOs;
using ToDo.Shared.Entities;

namespace ToDo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public AuthController(DataContext context, IConfiguration config) {
            _context = context; 
            _config = config;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            Console.WriteLine("Solicitud recibida: " + dto.Email);
            var usuario = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (usuario == null || !VerificarPassword(dto.Password, usuario.Password))
            {
                return Unauthorized(new {message = "Credenciales invalidades"});
            }

            var token = GenerateToken(usuario);
            return Ok(new { token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Verificar si ya existe
            var existe = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (existe)
            {
                return BadRequest(new { mensaje = "El correo ya está registrado" });
            }

            // Hashear contraseña
            var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var usuario = new User {  Email = dto.Email, Password = hash, };

            _context.Users.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario registrado exitosamente" });
        }


        private string GenerateToken(User usuario) 
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.Name, usuario.Email),
            new Claim("id", usuario.Id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool VerificarPassword(string password, string hash)
        {
            return BCrypt.Net.BCrypt.Verify(password, hash);
        }
    }
}

