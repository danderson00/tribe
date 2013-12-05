using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.HostStarters
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
