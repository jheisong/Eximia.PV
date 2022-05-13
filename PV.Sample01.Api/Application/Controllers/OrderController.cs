using Microsoft.AspNetCore.Mvc;
using System;

namespace Sync.Api.Application.Controllers
{
    [ApiController]
    [ControllerName("Order")]
    [Route("api/v1/order")]
    [Produces("application/json")]
    [ApiVersion("1.0")]
    public class OrderController : Controller
    {
        [HttpPut("id/{id}")]
        public IActionResult Post(Guid id)
        {
            UseCases.PlayWithAnOrderSynchronously.PlayStatusSaga(id);

            return new OkResult();
        }
    }
}