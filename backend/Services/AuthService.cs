using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Repository;
using backend.DTOs.Usuario;
using backend.Models;
using BCrypt.Net;


namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public AuthService(IUserRepository userRepository, IJwtTokenGenerator tokenGenerator)
    {
        _userRepository = userRepository;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<UserResponseDto?> RegisterAsync(UserRegisterDto dto)
    {
        var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
        if (existingUser != null) return null; // ya existe

        var user = new Usuario
        {
            Nombre = dto.Nombre,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            IdRol = dto.IdRol
        };

        await _userRepository.AddUserAsync(user);
        //await _userRepository.SaveChangesAsync();

        var rol = await _userRepository.GetRolByIdAsync(user.IdRol);

        return new UserResponseDto
        {
            Id = user.Id,
            Nombre = user.Nombre,
            Email = user.Email,
            Rol = rol.Id,
            Token = _tokenGenerator.GenerateToken(user) // JWT
        };
    }
    
    public async Task<UserResponseDto?> LoginAsync(UserLoginDto dto)
    {
        var user = await _userRepository.GetByEmailAsync(dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return null;

        var rol = await _userRepository.GetRolByIdAsync(user.IdRol);

        return new UserResponseDto
        {
            Id = user.Id,
            Nombre = user.Nombre,
            Email = user.Email,
            Rol = rol.Id,
            Token = _tokenGenerator.GenerateToken(user)
        };
    }
}