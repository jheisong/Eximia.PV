using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PV.Sample01.Api.Models.Receivables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace PV.Sample01.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReceivableUnitController : Controller
    {
        private readonly ILogger<ReceivableUnitController> _logger;

        public ReceivableUnitController(ILogger<ReceivableUnitController> logger)
        {
            _logger = logger;
        }

        private static readonly string[] Products = new[]
        {
            "Pague Veloz", "Stone", "Cielo", "Pague Seguro", "GetNet"
        };


        [HttpGet]
        public IActionResult Get()
        {
            var rng = new Random();
            var result = Enumerable.Range(1, 5).Select(index => new ReceivableUnit
            {
                Date = DateTime.Now.AddDays(index),
                Product = Products[rng.Next(Products.Length)],
                Flag = "Bandeira",
                Document = "000.000.010/0001-00",
                GrossValue = rng.Next(1, 5) * 100,
                Discount = 0,
                Value = rng.Next(1, 5) * 100
            })
            .ToArray();

            return new OkObjectResult(result);
        }
    }
}
