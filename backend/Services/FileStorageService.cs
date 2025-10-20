namespace backend.Services;

public class FileStorageService : IFileStorageService
{
  private readonly string _uploadsPath;
  public FileStorageService(IWebHostEnvironment env)
  {
    _uploadsPath = Path.Combine(env.WebRootPath, "uploads"); // Crea el path absoluto hacia wwwroot/uploads

    // Asegura que exista la carpeta
    if (!Directory.Exists(_uploadsPath)) Directory.CreateDirectory(_uploadsPath);
  }

  public async Task<string> UploadFileAsync(IFormFile file)
  {
    // Validar el archivo
    if (file == null || file.Length == 0) throw new ArgumentException("Archivo inválido");

    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName); // crear un nombre unico para el archivo
    var uploadsPath = Path.Combine(_uploadsPath, fileName); // crear la ruta completa
                                                            // Asegurarse de que el directorio existe

    using (var newFile = File.Create(uploadsPath)) // crear el archivo
    {
      await file.CopyToAsync(newFile); // copiar el contenido del archivo subido al nuevo archivo
      newFile.Flush(); // asegurar que todo el contenido se ha escrito.
    }
    var relativePath = $"/uploads/{fileName}"; // ruta relativa para almacenar en la base de datos
    return relativePath;
  }
}