using lab4.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace lab4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController: ControllerBase
    {
        private readonly ModelContext modelContext;
        public OrderController(ModelContext modelContext)
        {
            this.modelContext = modelContext;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCars()
        {
            var reportInfo = await modelContext.Reports.ToListAsync();
            return Ok(reportInfo);
        }

    }
}
