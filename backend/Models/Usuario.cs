using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int? IdRol { get; set; }

    public string Password { get; set; } = null!;

    public bool? Estado { get; set; }

    public int? CreadoPor { get; set; }

    public int? ActualizadoPor { get; set; }

    public DateTime? CreadoEn { get; set; }

    public DateTime? ActualizadoEn { get; set; }

    public virtual Usuario? ActualizadoPorNavigation { get; set; }

    public virtual Usuario? CreadoPorNavigation { get; set; }

    public virtual Rol? IdRolNavigation { get; set; }

    public virtual ICollection<Usuario> InverseActualizadoPorNavigation { get; set; } = new List<Usuario>();

    public virtual ICollection<Usuario> InverseCreadoPorNavigation { get; set; } = new List<Usuario>();

    public virtual ICollection<Rol> RolActualizadoPorNavigations { get; set; } = new List<Rol>();

    public virtual ICollection<Rol> RolCreadoPorNavigations { get; set; } = new List<Rol>();
}
