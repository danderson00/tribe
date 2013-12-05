using NServiceBus;
using Tribe.SignalR.Core.Configuration;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Buses.NServiceBus
{
    public static class ConfigureExtensions
    {
        public static IConfigure NServiceBus(this IConfigure configure, IBus bus)
        {
            configure.Container.RegisterAsSingleton(bus);
            return configure.MessageBus<NServiceBusMessageBus>();
        }
    }
}
