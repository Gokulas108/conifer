using System;
using Conifer.Models;
using Microsoft.EntityFrameworkCore;

namespace Conifer.Data; 

public class ApiDbContext : DbContext
{
	public DbSet<User> Users { get; set; }

	public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
	{

	}
}
 
