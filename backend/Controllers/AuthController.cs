using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Repository;
using backend.Models;
using backend.DTOs.Usuario;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[Route("api/[controller]")]
[AllowAnonymous]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        if (result == null) return BadRequest("El usuario ya existe.");
        return Ok(result);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (result == null) return Unauthorized("Credenciales inválidas.");
        return Ok(result);
    }

    // --------------

    /*[HttpGet]
    public async Task<ActionResult<List<Usuario>>> GetAll()
    {
        var usuarios = await _repository.GetAll();
        return Ok(usuarios);
    }*/

    /*[HttpGet]
    public async Task<ActionResult<List<Usuario>>> GetAll(String email)
    {
        var usuarios = await _repository.GetByEmailAsync(email);
        return Ok(usuarios);
    }*/

}