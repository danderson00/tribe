using System.Reflection;
using Microsoft.AspNet.SignalR;

namespace Tribe.MessageHub.Interfaces
{
    public interface IConfiguration
    {
        Assembly[] MessageAssemblies { get; set; }
        IDependencyResolver DependencyResolver { get; set; }
        dynamic Settings { get; set; }
    }
}
