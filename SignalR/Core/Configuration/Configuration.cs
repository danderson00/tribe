using System.Reflection;
using Microsoft.AspNet.SignalR;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.Configuration
{
    public class Configuration : IConfiguration
    {
        public Assembly[] MessageAssemblies { get; set; }
        public IDependencyResolver DependencyResolver { get; set; }
        public dynamic Settings { get; set; }
    }
}
