namespace backend.DTOs.Mascota;

public class PetResponseDto
{
  public int Id { get; set; }
  public string Nombre { get; set; } = string.Empty;
  public string Especie { get; set; } = string.Empty;
  public string? Raza { get; set; }
  public int Edad { get; set; }
  public string? PhotoUrl { get; set; }
  public int UsuarioId { get; set; }
}