using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Mascota
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Especie { get; set; } = null!;

    public string? Raza { get; set; }

    public int Edad { get; set; }

    public string? PhotoUrl { get; set; }

    public int UsuarioId { get; set; }

    public DateTime? CreadoEn { get; set; }

    public DateTime? ActualizadoEn { get; set; }

    public virtual Usuario Usuario { get; set; } = null!;
}
