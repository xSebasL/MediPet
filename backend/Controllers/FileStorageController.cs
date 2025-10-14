using backend.DTOs.Mascota;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileStorageController : ControllerBase
{
  private readonly IFileStorageService _fileStorageService;
  private readonly IHttpContextAccessor _httpContext;

  public FileStorageController(IFileStorageService fileStorageService, IHttpContextAccessor httpContext)
  {
    _fileStorageService = fileStorageService; // Inyectar el servicio de almacenamiento de archivos
    _httpContext = httpContext; // Inyectar el contexto HTTP para obtener información de la solicitud
  }

  [HttpPost("upload")]
  public async Task<IActionResult> UploadFile(IFormFile file)
  {
    var relativeUrl = await _fileStorageService.UploadFileAsync(file);

    var baseUrl = $"{Request.Scheme}://{Request.Host}"; // Obtener el esquema y host de la solicitud actual, ejemplo: 
    var fullUrl = $"{baseUrl}{relativeUrl}";

    return Ok(new { url = fullUrl });
  }
}
