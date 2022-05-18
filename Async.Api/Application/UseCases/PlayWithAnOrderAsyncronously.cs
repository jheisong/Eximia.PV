namespace Async.Api.Application.UseCases
{
    public class PlayWithAnOrderAsynchronously
    {
        public static async Task PlayStatusSaga(Guid receivableUnitId)
        {
            var id = receivableUnitId;

            var receivableUnit = Data.SimpleMemoryDataStore.GetReceivableUnit(id);

            receivableUnit.MoveToWaitingSomethingStatus();
            await Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            await Sleep();

            receivableUnit.MoveToProcessingStatus();
            await Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            await Sleep();

            receivableUnit.MoveToDoneStatus();
            await Data.SimpleMemoryDataStore.UpdateReceivableUnit(receivableUnit);
            await Sleep();
        }

        private static async Task Sleep() => await Task.Delay(500);
    }
}
