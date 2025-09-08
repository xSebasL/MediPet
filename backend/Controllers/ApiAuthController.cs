using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Repository;
using backend.Models;
using backend.DTOs.Usuario;
using backend.Services;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ApiAuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public ApiAuthController(IAuthService authService)
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