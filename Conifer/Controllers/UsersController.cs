using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conifer.Data;
using Conifer.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Conifer.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApiDbContext dbContext;

        public UsersController(ApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var test_user = new User();
            return dbContext.Users.ToList() ;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            System.Diagnostics.Debug.WriteLine(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

