using backend.Models;

namespace backend.Repository;

public interface IPetRepository
{
  Task<Mascota?> GetByIdAsync(int id);
  Task<IEnumerable<Mascota>> GetByUserIdAsync(int usuarioId);
  Task AddAsync(Mascota mascota);
  void Update(Mascota mascota);
  //void Remove(Mascota mascota);
  Task SaveChangesAsync();
}