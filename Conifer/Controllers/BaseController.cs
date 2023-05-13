using System;
using System.Security.Claims;
using Conifer.Data;
using Conifer.Models;
using Microsoft.AspNetCore.Mvc;

namespace Conifer.Controllers;

public class BaseController : Controller
{
    protected async Task<ActionResult> trycatch(Func<Task<ActionResult>> func)
    {
        try
        {
            return await func();
        }
        catch (Exception ex)
        {
            return BadRequest(new ResponseType { message = ex.Message });
        }
    }

    protected ActionResult trycatch(Func<ActionResult> func)
    {
        try
        {
            return func();
        }
        catch (Exception ex)
        {
            return BadRequest(new ResponseType { message = ex.Message });
        }
    }

    protected User? getCurrentUser()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            return new User
            {
                username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value ?? "",
                role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value ?? "",
                Id = Int32.Parse(userClaims.FirstOrDefault(o => o.Type == "id")?.Value ?? "")
            };
        }
        return null;
    }
}

