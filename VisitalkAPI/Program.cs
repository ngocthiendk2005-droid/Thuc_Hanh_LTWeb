using Microsoft.EntityFrameworkCore;
using VisitalkAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// ── 1. Đăng ký Controllers ──────────────────────────────────────────────
builder.Services.AddControllers();

// ── 2. Cấu hình EF Core kết nối SQL Server ─────────────────────────────
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ── 3. Cấu hình CORS cho phép React (Vite port 5173) gọi API ───────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",   // Vite dev
                "http://localhost:3000"    // Dự phòng CRA
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ── 4. Swagger ─────────────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Visitalk API", Version = "v1" });
});

var app = builder.Build();

// ── 5. Middleware pipeline ──────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Visitalk API v1");
        c.RoutePrefix = "swagger"; // Truy cập tại /swagger
    });
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp"); // CORS phải đặt TRƯỚC UseAuthorization

app.UseAuthorization();

app.MapControllers();

app.Run();