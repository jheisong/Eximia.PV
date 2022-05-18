using Async.Api.Application.Hubs;
using Async.Api.Models;

namespace Async.Api.Data
{
    public static class SimpleMemoryDataStore
    {
        static SimpleMemoryDataStore()
        {
            ReceivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());
            ReceivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());
            ReceivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());
            ReceivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());
            ReceivableUnitsInMemory.Add(ReceivableUnit.CreateRandomly());
        }

        private static readonly IList<ReceivableUnit> ReceivableUnitsInMemory = new List<ReceivableUnit>();

        public static void StoreIncomingReceivableUnit(ReceivableUnit receivableUnit)
        {
            ReceivableUnitsInMemory.Add(receivableUnit);
        }

        public static IList<ReceivableUnit> GetReceivableUnits()
        {
            var result = ReceivableUnitsInMemory;

            return result;
        }

        public static ReceivableUnit GetReceivableUnit(Guid id)
        {
            var list = ReceivableUnitsInMemory;

            var result = list.SingleOrDefault(x => x.Id == id);

            return result;
        }

        public static async Task UpdateReceivableUnit(ReceivableUnit updatedReceivableUnit)
        {
            _ = ReceivableUnitsInMemory.Where(x => x.Id == updatedReceivableUnit.Id).Select(x => { return updatedReceivableUnit; });

            using var asyncHub = new ReceivableUnitHub();

            await asyncHub.DispatchMessage(updatedReceivableUnit);
        }
    }
}
