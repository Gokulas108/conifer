using System;
using System.ComponentModel.DataAnnotations;

namespace Conifer.Models;

public class User : BaseEntity
{
    public string Username { get; set; } = "";
    public string password { get; set; } = "";
    public string role { get; set; } = "user";
}

