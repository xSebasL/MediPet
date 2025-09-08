using backend.Models;

public interface IJwtTokenGenerator
{
  string GenerateToken(Usuario usuario);
}
