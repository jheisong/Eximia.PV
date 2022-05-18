using Async.Api.Models;

namespace Async.Api.Application.Hubs.Clients
{
    public interface IReceivableUnitClient
    {
        Task UpdateReceivableUnit(ReceivableUnit receivableUnit);
    }
}
