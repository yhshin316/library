using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController(DataContext context) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(RegisterDto registerDto)
    {
        if(registerDto.username=="") return BadRequest("Username is empty");
        if(await UserExists(registerDto.username)) return BadRequest("Username already exists");


        using var hmac = new HMACSHA512();

        var user = new User
        {
            Username = registerDto.username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
            PasswordSalt = hmac.Key,
            Role = registerDto.role
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> login(loginDto loginDto)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.Username == loginDto.username.ToLower());

        if(user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

        for(int i=0; i<computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        }

        return user;
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.Username.ToLower() == username.ToLower());
    }
}
