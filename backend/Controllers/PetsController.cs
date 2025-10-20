using backend.DTOs.Mascota;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
  private readonly IPetService _service;

  public PetsController(IPetService service)
  {
    _service = service;
  }

  // POST /api/pets
  [HttpPost]
  [Authorize] // requiere JWT
  public async Task<IActionResult> Create([FromBody] PetCreateDto dto)
  {
    // Overwrite dto.UsuarioId from token (no confiar en cliente)
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"); // ID del usuario autenticado, o 0 si no está autenticado
    dto.UsuarioId = userId; // Asignar el ID del usuario autenticado al DTO

    try
    {
      var result = await _service.CreatePetAsync(dto); // Crear la mascota
      return CreatedAtAction(nameof(GetByUser), new { usuarioId = result.UsuarioId }, result); // Retornar 201 con la mascota creada, y la ruta para obtenerla.
    }
    catch (ArgumentException ex)
    {
      return BadRequest(new { message = ex.Message }); // Retornar 400 si hay un error en los datos
    }
  }

  // GET /api/pets (lista del usuario autenticado)
  [HttpGet]
  [Authorize]
  public async Task<IActionResult> GetByUser()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"); // ID del usuario autenticado, o 0 si no está autenticado
    var list = await _service.GetPetsByUserAsync(userId); // Obtener mascotas del usuario autenticado
    return Ok(list);
  }
  
  // PUT /api/pets/{id}
  [HttpPut("{id}")]
  [Authorize]
  public async Task<IActionResult> Update(int id, [FromBody] PetUpdateDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0"); // ID del usuario autenticado, o 0 si no está autenticado
    try
    {
      var updated = await _service.UpdatePetAsync(id, dto, userId); // Actualizar la mascota
      if (updated == null) return Forbid(); // o NotFound
      return Ok(updated); // Retornar 200 con la mascota actualizada
    }
    catch (ArgumentException ex)
    {
      return BadRequest(new { message = ex.Message }); // Retornar 400 si hay un error en los datos
    }
  }

  // DELETE /api/pets/{id}
  /* [HttpDelete("{id}")]
  [Authorize]
  public async Task<IActionResult> Delete(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
    var deleted = await _service.DeletePetAsync(id, userId);
    if (!deleted) return Forbid();
    return NoContent();
  } */
}