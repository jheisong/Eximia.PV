using Async.Api.Application.Hubs.Clients;
using Async.Api.Models;
using Microsoft.AspNetCore.SignalR;

namespace Async.Api.Application.Hubs
{
    public class ReceivableUnitHub : Hub
    {
        public async Task DispatchMessage(ReceivableUnit receivableUnit)
        {
            await Clients.All.SendAsync("DispatchMessage", receivableUnit);
        }
    }
}
