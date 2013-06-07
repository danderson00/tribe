using System.Reflection;
using Microsoft.AspNet.SignalR;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.Configuration
{
    public class Configuration : IConfiguration
    {
        public Assembly[] MessageAssemblies { get; set; }
        public IDependencyResolver DependencyResolver { get; set; }
        public dynamic Settings { get; set; }
    }
}
