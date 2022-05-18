using Microsoft.AspNetCore.Mvc;

namespace Async.Api.Application.Controllers
{
    [ApiController()]
    [Route("api/v1/order")]
    [Produces("application/json")]
    public class OrderController : Controller
    {
        [HttpPut("id/{id}")]
        public async Task<IActionResult> Post(Guid id)
        {
            await UseCases.PlayWithAnOrderAsynchronously.PlayStatusSaga(id);
 
            return new OkResult();
        }
    }
}