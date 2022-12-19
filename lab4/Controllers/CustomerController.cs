using lab4.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace lab4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ModelContext modelContext;

        public CustomerController(ModelContext modelContext)
        {
            this.modelContext = modelContext;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers() 
        {
            var users = await modelContext.Customers.ToListAsync();

            return Ok(users);
        }
    }
}
