﻿using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class User
{
    public int Id {get; set;}
    public required string Username {get; set;}
    public required byte[] PasswordHash {get; set;}
    public required byte[] PasswordSalt {get; set;}
    public required string Role {get; set;}
}
