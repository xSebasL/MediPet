using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class UserRepository : IUserRepository
{
  private readonly MedipetContext _context;

  public UserRepository(MedipetContext context)
  {
    _context = context;
  }

  public async Task<Usuario?> GetByEmailAsync(string email)
  {
      return await _context.Usuarios
          .Include(u => u.IdRolNavigation)
          .FirstOrDefaultAsync(u => u.Email == email);
  }

  public async Task AddUserAsync(Usuario usuario)
  {
    _context.Usuarios.Add(usuario);
    await _context.SaveChangesAsync();
  }

  public async Task SaveChangesAsync()
  {
      await _context.SaveChangesAsync();
  }
  
  public async Task<Rol?> GetRolByIdAsync(int? idRol)
  {
      return await _context.Rols.FindAsync(idRol);
  }

  // -------------

  public async Task<List<Usuario>> GetAll()
  {
    var usuarios = await _context.Usuarios
      .Select(b => new Usuario
      {
        Id = b.Id,
        Nombre = b.Nombre,
        Email = b.Email
      })
      .ToListAsync();
    return usuarios;
  }
}
