using backend.Models;

interface IRepository
{
   Task<IEnumerable<Usuario>> GetAll();
   Task<Usuario> GetById(int id);
   //Task<Usuario> Add(Usuario usuario);
   //Task<Usuario> Update(Usuario usuario);
   //Task<Usuario> Delete(int id);  
}