using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conifer.Data;
using Conifer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Conifer.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : BaseController
    {

        private readonly ApiDbContext dbContext;

        public ProjectController(ApiDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        // GET: api/values
        //[HttpGet]
        //public Task<ActionResult<IEnumerable<Project>>> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ResponseType>> Post([FromBody] Project project)
        {
            return await trycatch(async () =>
            {
                User? current_user = getCurrentUser();

                Project new_project = new Project
                {
                    number = project.number,
                    name = project.name,
                    contact = project.contact,
                    location = project.location,
                    type = project.type,
                    user = current_user
                };

                await dbContext.Projects.AddAsync(new_project);
                await dbContext.SaveChangesAsync();

                ResponseType response = new ResponseType { message = "Project Successfully created" };

                return Created("", response);
            });
        }

        // PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}

