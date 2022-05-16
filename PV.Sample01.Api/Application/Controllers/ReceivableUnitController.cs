using Microsoft.AspNetCore.Mvc;
using Sync.Api.Models;

namespace Sync.Api.Application.Controllers
{
    [ApiController]
    [ControllerName("Receivable Units")]
    [Route("api/v1/receivable-unit")]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    public class ReceivableUnitController : Controller
    {
        [HttpGet()]
        public IActionResult Get()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            System.Threading.Thread.Sleep(5000);

            return new OkObjectResult(Data.SimpleMemoryDataStore.GetReceivableUnits());
        }

        [HttpPut()]
        public IActionResult Put()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            System.Threading.Thread.Sleep(2000);

            Data.SimpleMemoryDataStore.StoreIncomingReceivableUnit(ReceivableUnit.CreateRandomly());

            return new OkResult();
        }
    }
}
