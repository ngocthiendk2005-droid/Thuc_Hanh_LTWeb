using System.ComponentModel.DataAnnotations;

namespace VisitalkAPI.Models
{
    // ════════════════════════════════════════
    //  USER
    // ════════════════════════════════════════
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? AvatarUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }

    // ════════════════════════════════════════
    //  POST
    // ════════════════════════════════════════
    public class Post
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public int UserId { get; set; }

        // Navigation
        public User? User { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }

    // ════════════════════════════════════════
    //  COMMENT
    // ════════════════════════════════════════
    public class Comment
    {
        public int Id { get; set; }

        [Required, MaxLength(1000)]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign keys
        public int PostId { get; set; }
        public int UserId { get; set; }

        // Navigation
        public Post? Post { get; set; }
        public User? User { get; set; }
    }
}