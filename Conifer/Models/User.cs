using System;
using System.ComponentModel.DataAnnotations;

namespace Conifer.Models;

public class User : BaseEntity
{
    [StringLength(50)]
    public string Username { get; set; } = "";

    [StringLength(50)]
    public string password { get; set; } = "";

    [StringLength(20)]
    public string role { get; set; } = "user";
}

