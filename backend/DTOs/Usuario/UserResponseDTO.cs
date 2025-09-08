// DTOs/UserResponseDto.cs
public class UserResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Rol { get; set; }
    public string Token { get; set; } = string.Empty; // JWT
}
