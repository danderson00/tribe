using NServiceBus;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Buses.NServiceBus
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
