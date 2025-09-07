using backend.Models;
using Microsoft.EntityFrameworkCore;

public class Repository : IRepository
{
  private readonly MedipetContext _context;

  public Repository(MedipetContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Usuario>> GetAll()
  {
    return await _context.Usuarios.ToListAsync();
  }

  public async Task<Usuario> GetById(int id)
  {
    return await _context.Usuarios.FindAsync(id);
  }
}