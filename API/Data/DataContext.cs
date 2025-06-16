using API.Entities;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users {get; set;}
    public DbSet<Book> Books { get; set;}
}
