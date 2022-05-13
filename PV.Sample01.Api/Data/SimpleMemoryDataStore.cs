using Sync.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sync.Api.Data
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
            var result = ReceivableUnitsInMemory.SingleOrDefault(x => x.Id == id);

            return result;
        }

        public static void UpdateReceivableUnit(ReceivableUnit updatedReceivableUnit)
        {
            _ = ReceivableUnitsInMemory.Where(x => x.Id == updatedReceivableUnit.Id).Select(x => { return updatedReceivableUnit; });
        }
    }
}
