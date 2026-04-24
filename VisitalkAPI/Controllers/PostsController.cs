// Controllers/PostsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitalkAPI.Data;
using VisitalkAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace VisitalkAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // → /api/posts
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // ── GET /api/posts ───────────────────────────────────────────────
        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedAt,
                    p.UpdatedAt,
                    Author       = new { p.User!.Id, p.User.Username, p.User.AvatarUrl },
                    CommentCount = p.Comments.Count
                })
                .ToListAsync();

            return Ok(posts);
        }

        // ── GET /api/posts/5 ─────────────────────────────────────────────
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Comments).ThenInclude(c => c.User)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedAt,
                    p.UpdatedAt,
                    Author   = new { p.User!.Id, p.User.Username, p.User.AvatarUrl },
                    Comments = p.Comments
                        .OrderBy(c => c.CreatedAt)
                        .Select(c => new
                        {
                            c.Id,
                            c.Content,
                            c.CreatedAt,
                            Author = new { c.User!.Id, c.User.Username, c.User.AvatarUrl }
                        })
                })
                .FirstOrDefaultAsync();

            if (post == null)
                return NotFound(new { message = $"Không tìm thấy bài viết ID {id}." });

            return Ok(post);
        }

        // ── GET /api/posts/user/5 ────────────────────────────────────────
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPostsByUser(int userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedAt,
                    CommentCount = p.Comments.Count
                })
                .ToListAsync();

            return Ok(posts);
        }

        // ── POST /api/posts ──────────────────────────────────────────────
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await _context.Users.AnyAsync(u => u.Id == dto.UserId))
                return NotFound(new { message = "User không tồn tại." });

            var post = new Post
            {
                Title    = dto.Title,
                Content  = dto.Content,
                ImageUrl = dto.ImageUrl,
                UserId   = dto.UserId
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, new
            {
                post.Id,
                post.Title,
                post.CreatedAt
            });
        }

        // ── PUT /api/posts/5 ─────────────────────────────────────────────
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdatePostDto dto)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound(new { message = $"Không tìm thấy bài viết ID {id}." });

            if (dto.Title != null)    post.Title    = dto.Title;
            if (dto.Content != null)  post.Content  = dto.Content;
            if (dto.ImageUrl != null) post.ImageUrl = dto.ImageUrl;
            post.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cập nhật bài viết thành công.", post.Id, post.Title });
        }

        // ── DELETE /api/posts/5 ──────────────────────────────────────────
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound(new { message = $"Không tìm thấy bài viết ID {id}." });

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return Ok(new { message = $"Đã xóa bài viết ID {id}." });
        }
    }

    // ── DTOs ─────────────────────────────────────────────────────────────
    public record CreatePostDto(
        [Required] string Title,
        [Required] string Content,
        string? ImageUrl,
        [Required] int UserId
    );

    public record UpdatePostDto(string? Title, string? Content, string? ImageUrl);
}