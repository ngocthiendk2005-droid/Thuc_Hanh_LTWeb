// Controllers/UsersController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitalkAPI.Data;
using VisitalkAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace VisitalkAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // → /api/users
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // ── GET /api/users ───────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.AvatarUrl,
                    u.CreatedAt,
                    PostCount = u.Posts.Count
                })
                .ToListAsync();

            return Ok(users);
        }

        // ── GET /api/users/5 ─────────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.AvatarUrl,
                    u.CreatedAt,
                    PostCount = u.Posts.Count
                })
                .FirstOrDefaultAsync();

            if (user == null)
                return NotFound(new { message = $"Không tìm thấy user ID {id}." });

            return Ok(user);
        }

        // ── POST /api/users ──────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Kiểm tra email trùng
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return Conflict(new { message = "Email này đã được sử dụng." });

            var user = new User
            {
                Username = dto.Username,
                Email    = dto.Email,
                // Hash password trước khi lưu
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                AvatarUrl    = dto.AvatarUrl
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new
            {
                user.Id,
                user.Username,
                user.Email,
                user.CreatedAt
            });
        }

        // ── PUT /api/users/5 ─────────────────────────────────────────────
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = $"Không tìm thấy user ID {id}." });

            if (dto.Username != null) user.Username  = dto.Username;
            if (dto.AvatarUrl != null) user.AvatarUrl = dto.AvatarUrl;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cập nhật thành công.", user.Id, user.Username });
        }

        // ── DELETE /api/users/5 ──────────────────────────────────────────
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = $"Không tìm thấy user ID {id}." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = $"Đã xóa user ID {id}." });
        }
    }

    // ── DTOs ─────────────────────────────────────────────────────────────
    public record CreateUserDto(
        [Required] string Username,
        [Required][EmailAddress] string Email,
        [Required][MinLength(6)] string Password,
        string? AvatarUrl
    );

    public record UpdateUserDto(string? Username, string? AvatarUrl);
}