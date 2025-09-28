using backend.DTOs.Mascota;

namespace backend.Services;

public interface IPetService
{
  Task<PetResponseDto> CreatePetAsync(PetCreateDto dto);
  Task<IEnumerable<PetResponseDto>> GetPetsByUserAsync(int usuarioId);
  Task<PetResponseDto?> UpdatePetAsync(int id, PetUpdateDto dto, int usuarioId);
  //Task<bool> DeletePetAsync(int id, int usuarioId);
}