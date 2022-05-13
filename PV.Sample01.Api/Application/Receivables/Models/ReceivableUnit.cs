using System;

namespace Sync.Api.Application.Receivables.Models
{
    public class ReceivableUnit
    {
        public string Product { get; set; }
        public string Flag { get; set; }
        public DateTime Date { get; set; }
        public string Document { get; set; }
        public decimal GrossValue { get; set; }
        public decimal Discount { get; set; }
        public decimal Value { get; set; }
    }
}
