namespace backend.DTOs.Mascota;

public class PetCreateDto
{
  public string Nombre { get; set; } = string.Empty;
  public string Especie { get; set; } = string.Empty;
  public string? Raza { get; set; }
  public int Edad { get; set; }
  public string? PhotoUrl { get; set; } // puede ser una URL o base64 (mejor URL)
  public int UsuarioId { get; set; } // dueño
}
