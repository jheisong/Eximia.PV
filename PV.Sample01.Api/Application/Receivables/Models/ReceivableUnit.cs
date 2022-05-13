using System;

namespace Sync.Api.Application.Receivables.Models
{
    public sealed class ReceivableUnit
    {
        public string Product { get; private set; }
        public string Flag { get; private set; }
        public DateTime Date { get; private set; }
        public string Document { get; private set; }
        public decimal GrossValue { get; private set; }
        public decimal Discount { get; private set; }
        public decimal Value { get; private set; }

        public static ReceivableUnit CreateRandomly()
        {
            var Products = new[] { "Pague Veloz", "Stone", "Cielo", "Pague Seguro", "GetNet" };

            var rng = new Random();

            return new ReceivableUnit()
            {
                Date = DateTime.Now.AddDays(rng.Next(0, 1000)),
                Product = Products[rng.Next(Products.Length)],
                Flag = "Bandeira",
                Document = "000.000.010/0001-00",
                GrossValue = rng.Next(1, 5) * 100,
                Discount = 0,
                Value = rng.Next(1, 5) * 100
            };
        }
    }
}
