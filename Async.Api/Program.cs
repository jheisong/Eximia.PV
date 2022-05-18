/*
using Async.Api.Application.Hubs;

var builder = Host.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseFileServer();

app.UseRouting();

app.UseEndpoints(endpoints => endpoints.MapHub<ReceivableUnitHub>("/hubs/receivableUnit"));

app.Run();

*/

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Async.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}