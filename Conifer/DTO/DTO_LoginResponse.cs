using System;
namespace Conifer.DTO;

public class DTO_LoginResponse
{
    public DTO_LoggedUser? user { get; set; }

    public string token { get; set; } = string.Empty;
}

public class DTO_LoggedUser
{
    public int Id { get; set; }

    public string username { get; set; } = string.Empty;

    public string name { get; set; } = string.Empty;

    public string role { get; set; } = string.Empty;

    public Boolean first_login { get; set; }
}

