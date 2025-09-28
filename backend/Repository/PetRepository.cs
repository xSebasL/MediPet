using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;
public class PetRepository : IPetRepository
{
  private readonly MedipetContext _context;
  public PetRepository(MedipetContext context)
  {
    _context = context;
  }

  public async Task<Mascota?> GetByIdAsync(int id)
  {
    return await _context.Mascotas.FindAsync(id);
  }

  public async Task<IEnumerable<Mascota>> GetByUserIdAsync(int usuarioId)
  {
    return await _context.Mascotas
        .Where(m => m.UsuarioId == usuarioId)
        .ToListAsync();
  }

  public async Task AddAsync(Mascota mascota)
  {
    await _context.Mascotas.AddAsync(mascota);
  }

  public void Update(Mascota mascota)
  {
    _context.Mascotas.Update(mascota);
  }

  /* public void Remove(Mascota mascota)
  {
    _context.Mascotas.Remove(mascota);
  } */

  public async Task SaveChangesAsync()
  {
    await _context.SaveChangesAsync();
  }
}
