// backend/Services/PetService.cs
using backend.DTOs.Mascota;
using backend.Models;
using backend.Repository;

namespace backend.Services;
public class PetService : IPetService
{
  private readonly IPetRepository _repo;

  public PetService(IPetRepository repo)
  {
      _repo = repo;
  }

  public async Task<PetResponseDto> CreatePetAsync(PetCreateDto dto)
  {
      // Validaciones básicas
      if (dto.Edad < 0) throw new ArgumentException("La edad no puede ser negativa.");
      if (string.IsNullOrWhiteSpace(dto.Nombre)) throw new ArgumentException("El nombre es obligatorio.");
      if (string.IsNullOrWhiteSpace(dto.Especie)) throw new ArgumentException("La especie es obligatoria.");

      var mascota = new Mascota
      {
          Nombre = dto.Nombre,
          Especie = dto.Especie,
          Raza = dto.Raza,
          Edad = dto.Edad,
          PhotoUrl = dto.PhotoUrl,
          UsuarioId = dto.UsuarioId
      };

      await _repo.AddAsync(mascota);
      await _repo.SaveChangesAsync();

      return new PetResponseDto
      {
          Id = mascota.Id,
          Nombre = mascota.Nombre,
          Especie = mascota.Especie,
          Raza = mascota.Raza,
          Edad = mascota.Edad,
          PhotoUrl = mascota.PhotoUrl,
          UsuarioId = mascota.UsuarioId
      };
  }

  public async Task<IEnumerable<PetResponseDto>> GetPetsByUserAsync(int usuarioId)
  {
      var list = await _repo.GetByUserIdAsync(usuarioId);
      return list.Select(m => new PetResponseDto {
          Id = m.Id,
          Nombre = m.Nombre,
          Especie = m.Especie,
          Raza = m.Raza,
          Edad = m.Edad,
          PhotoUrl = m.PhotoUrl,
          UsuarioId = m.UsuarioId
      });
  }

  public async Task<PetResponseDto?> UpdatePetAsync(int id, PetUpdateDto dto, int usuarioId)
  {
      var pet = await _repo.GetByIdAsync(id);
      if (pet == null) return null;
      if (pet.UsuarioId != usuarioId) return null; // sólo dueño puede editar

      if (dto.Edad < 0) throw new ArgumentException("La edad no puede ser negativa.");

      pet.Nombre = dto.Nombre;
      pet.Especie = dto.Especie;
      pet.Raza = dto.Raza;
      pet.Edad = dto.Edad;
      pet.PhotoUrl = dto.PhotoUrl;

      _repo.Update(pet);
      await _repo.SaveChangesAsync();

      return new PetResponseDto
      {
          Id = pet.Id,
          Nombre = pet.Nombre,
          Especie = pet.Especie,
          Raza = pet.Raza,
          Edad = pet.Edad,
          PhotoUrl = pet.PhotoUrl,
          UsuarioId = pet.UsuarioId
      };
  }

  /* public async Task<bool> DeletePetAsync(int id, int usuarioId)
  {
      var pet = await _repo.GetByIdAsync(id);
      if (pet == null) return false;
      if (pet.UsuarioId != usuarioId) return false;

      _repo.Remove(pet);
      await _repo.SaveChangesAsync();
      return true;
  } */
}
