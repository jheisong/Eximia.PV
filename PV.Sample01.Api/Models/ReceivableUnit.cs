using System;

namespace Sync.Api.Models
{
    public sealed class ReceivableUnit
    {
        private ReceivableUnit()
        {
            if (Id == Guid.Empty)
                Id = Guid.NewGuid();
        }

        public Guid Id { get; private set; }
        public string CurrentStatus { get { return CurrentStatusAsEnum.ToString(); } }
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

        private ReceivableUnitStatus CurrentStatusAsEnum { get; set; } = ReceivableUnitStatus.Created;
        public void MoveToWaitingSomethingStatus() => CurrentStatusAsEnum = ReceivableUnitStatus.WaitingSomething;
        public void MoveToProcessingStatus() => CurrentStatusAsEnum = ReceivableUnitStatus.Processing;
        public void MoveToDoneStatus() => CurrentStatusAsEnum = ReceivableUnitStatus.Done;
    }

    public enum ReceivableUnitStatus
    {
        Created = 1,
        Processing = 2,
        WaitingSomething = 3,
        Done = 4
    }
}
