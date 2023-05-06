using System;
using System.ComponentModel.DataAnnotations;

namespace Conifer.Models;

public class BaseEntity
{
	[Required]
	public int Id { get; set; }

	public DateTime CreatedAt { get; set; }

	public DateTime UpdatedAt { get; set; }
}

