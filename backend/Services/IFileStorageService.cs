public interface IFileStorageService
{
  Task<string> UploadFileAsync(IFormFile file);
  //Task UpdateFileAsync(string existingFilePath, IFormFile newFile);
  //Task DeleteFileAsync(string filePath);
}