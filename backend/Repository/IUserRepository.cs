using backend.Models;

namespace backend.Repository;

public interface IUserRepository
{
   Task<Usuario?> GetByEmailAsync(string email);
   Task AddUserAsync(Usuario usuario);
   Task SaveChangesAsync();

   Task<Rol?> GetRolByIdAsync(int? idRol);

   // -------------
   Task<List<Usuario>> GetAll();
}