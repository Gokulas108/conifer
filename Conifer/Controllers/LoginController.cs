using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Conifer.Data;
using Conifer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Conifer.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : BaseController
    {
        private readonly IConfiguration config;
        private readonly ApiDbContext dbContext;

        public LoginController(IConfiguration config, ApiDbContext dbContext)
        {
            this.config = config;
            this.dbContext = dbContext;
        }


        [AllowAnonymous]
        [HttpPost]
        public ActionResult<UserLogin> Post([FromBody] UserLogin credentials)
        {
            return trycatch(() =>
            {
                var user = Authenticate(credentials);
                if (user != null)
                {
                    var token = Generate(user);
                    return Ok(new ResponseType<string> { message = "User Logged In Successfully", response_data = token });
                }
                return NotFound(new ResponseType { message = "Invalid Username or Password" });
            });
        }


        private User? Authenticate(UserLogin credentials)
        {
            return dbContext.Users.FirstOrDefault(row => row.username.ToLower() == credentials.username.ToLower() && row.password == credentials.password);

        }


        private string Generate(User user)
        {
            var security_key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"] ?? ""));
            var credentials = new SigningCredentials(security_key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.username),
                    new Claim(ClaimTypes.Name, user.name),
                    new Claim(ClaimTypes.Role, user.role),
                    new Claim("id", user.Id.ToString())
            };

            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(12),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

