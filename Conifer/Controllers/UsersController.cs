using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conifer.Data;
using Conifer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Conifer.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : BaseController
    {
        private readonly ApiDbContext dbContext;

        public UsersController(ApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/values
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<ResponseType<IEnumerable<User>>>> Get()
        {
            return await trycatch(async () =>
            {
                IEnumerable<User> users = await dbContext.Users.ToListAsync(); ;
                return Ok(new ResponseType<IEnumerable<User>> { response_data = users });
            });
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<ResponseType>> Post([FromBody] User user)
        {
            return await trycatch(async () =>
            {
                if (dbContext.Users.Any(row => row.username == user.username))
                    return BadRequest(new ResponseType { message = "Username already taken" });

                User new_user = new User
                {
                    name = user.name,
                    username = user.username,
                    password = user.password,
                    role = user.role,
                    first_login = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                await dbContext.Users.AddAsync(new_user);
                await dbContext.SaveChangesAsync();

                ResponseType response = new ResponseType { message = "User Successfully created" };

                return Created("", response);
            });
        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}

