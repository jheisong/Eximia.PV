using Async.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Async.Api.Application.Controllers
{
    [ApiController]
    [Route("api/v1/receivable-unit")]
    [Produces("application/json")]
    public class ReceivableUnitController : Controller
    {
        [HttpGet()]
        public IActionResult Get()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            Thread.Sleep(5000);

            return new OkObjectResult(Data.SimpleMemoryDataStore.GetReceivableUnits());
        }

        [HttpPut()]
        public IActionResult Put()
        {
            //REPRODUZINDO UMA CHAMADA LENTA AO BANCO DE DADOS.
            Thread.Sleep(2000);

            Data.SimpleMemoryDataStore.StoreIncomingReceivableUnit(ReceivableUnit.CreateRandomly());

            return new OkResult();
        }
    }
}
