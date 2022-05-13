using System;
using System.Threading;

namespace Sync.Api.Application.UseCases
{
    public class PlayWithAnOrderSynchronously
    {
        public static void PlayStatusSaga(Guid receivableUnitId)
        {
            var id = receivableUnitId;

            var receivableUnit = Data.SimpleMemoryDataStore.GetReceivableUnit(id);

            receivableUnit.MoveToWaitingSomethingStatus();
            Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            Sleep();

            receivableUnit.MoveToProcessingStatus();
            Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            Sleep();

            receivableUnit.MoveToDoneStatus();
            Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            Sleep();
        }

        private static void Sleep() => Thread.Sleep(500);
    }
}
