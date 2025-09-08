using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Usuario;

namespace backend.Services;

public interface IAuthService
{
    Task<UserResponseDto?> RegisterAsync(UserRegisterDto dto);
    Task<UserResponseDto?> LoginAsync(UserLoginDto dto);
}