using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Conifer.Models;

[Index(nameof(username), IsUnique = true)]
public class User : BaseEntity
{
    [StringLength(50)]
    public string username { get; set; } = "";

    [StringLength(50)]
    public string password { get; set; } = "";

    [StringLength(100)]
    public string name { get; set; } = "";

    [StringLength(20)]
    public string role { get; set; } = "user";

    public Boolean first_login { get; set; }
}

