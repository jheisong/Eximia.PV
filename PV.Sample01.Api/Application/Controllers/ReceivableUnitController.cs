using Microsoft.AspNetCore.Mvc;
using Sync.Api.Models;
using System.Collections.Generic;

namespace Sync.Api.Application.Controllers
{
    [ApiController]
    [ControllerName("Receivable Units")]
    [Route("api/v1/receivable-unit")]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    public class ReceivableUnitController : Controller
    {
        private static readonly List<ReceivableUnit> receivableUnitsInMemory = new List<ReceivableUnit>
        {
            ReceivableUnit.CreateRandomly(),
            ReceivableUnit.CreateRandomly(),
            ReceivableUnit.CreateRandomly(),
            ReceivableUnit.CreateRandomly(),
            ReceivableUnit.CreateRandomly()
        };

        [HttpGet()]
        public IActionResult Get()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            System.Threading.Thread.Sleep(5000);

            return new OkObjectResult(receivableUnitsInMemory);
        }

        [HttpPut()]
        public IActionResult Put()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            System.Threading.Thread.Sleep(2000);

            receivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());

            return new OkResult();
        }
    }
}
