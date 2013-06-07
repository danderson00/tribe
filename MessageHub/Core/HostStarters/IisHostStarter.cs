using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.HostStarters
{
    public class IisHostStarter : ISignalRHostStarter
    {
        public void Start(IDependencyResolver dependencyResolver)
        {
            var configuration = new HubConfiguration { Resolver = dependencyResolver };
            RouteTable.Routes.MapHubs(configuration);
        }
    }
}
