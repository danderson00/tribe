using Microsoft.AspNet.SignalR;

namespace Tribe.MessageHub.Interfaces
{
    public interface ISignalRHostStarter
    {
        void Start(IDependencyResolver dependencyResolver);
    }
}
