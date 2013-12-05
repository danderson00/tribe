using Microsoft.AspNet.SignalR;

namespace Tribe.SignalR.Interfaces
{
    public interface ISignalRHostStarter
    {
        void Start(IDependencyResolver dependencyResolver);
    }
}
