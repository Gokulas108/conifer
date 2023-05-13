using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Conifer.Models;

[Index(nameof(number), IsUnique = true)]
public class Project : BaseEntity
{
    [StringLength(20)]
    public string number { get; set; } = string.Empty;

    [StringLength(50)]
    public string name { get; set; } = string.Empty;

    [StringLength(50)]
    public string type { get; set; } = string.Empty;

    [StringLength(20)]
    public string contact { get; set; } = string.Empty;

    [StringLength(100)]
    public string location { get; set; } = string.Empty;

    [ForeignKey("Users")]
    public int createdBy { get; set; }

    public virtual User? user { get; set; }
}

