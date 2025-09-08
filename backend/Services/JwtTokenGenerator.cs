using backend.Services;
using backend.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace backend.Services;

public class JwtTokenGenerator : IJwtTokenGenerator
{
  private readonly IConfiguration _config;

  public JwtTokenGenerator(IConfiguration config)
  {
    _config = config;
  }

  public string GenerateToken(Usuario usuario)
  {
    var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
        new Claim(ClaimTypes.Role, usuario.IdRolNavigation.Nombre)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var securityToken = new JwtSecurityToken(
        claims: claims,
        //issuer: _config["Jwt:Issuer"],
        //audience: _config["Jwt:Audience"],
        expires: DateTime.Now.AddMinutes(60),
        signingCredentials: creds
    );

    var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

    return token;
  }
}
