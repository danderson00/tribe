using System.Dynamic;
using Tribe.MessageHub.Core.Channels;
using Tribe.MessageHub.Core.HostStarters;
using Tribe.MessageHub.Core.IncomingMessages;
using Tribe.MessageHub.Core.OutgoingMessages;
using Tribe.MessageHub.Core.Serialisers;
using Tribe.MessageHub.Core.TopicResolvers;
using Tribe.MessageHub.Interfaces;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Tribe.MessageHub.Core.Configuration
{
    public class ConfigureHub : IConfigure, IConfigureContainer
    {
        public IConfiguration Configuration { get; set; }
        public IContainer Container { get; private set;  }

        public ConfigureHub()
        {
            Configuration = new Configuration();
        }

        public static IConfigureContainer With()
        {
            return new ConfigureHub();
        }

        public void SetContainer(IContainer container, IDependencyResolver resolver)
        {
            Container = container;
            Configuration.DependencyResolver = resolver;
            SetDefaults();
        }

        private void SetDefaults()
        {
            this.TopicResolver<TypeNameTopicResolver>()
                .MessageSerialiser<JsonMessageSerialiser>()
                .MessageBus<NullMessageBus>()
                .HostStarter<IisHostStarter>();

            Container.RegisterService<IJavaScriptMinifier, NullJavaScriptMinifier>()
                     .RegisterService<IChannelAuthoriser, OpenChannelAuthoriser>()
                     .RegisterAsSingleton<IncomingMessageHandler>()
                     .RegisterAsSingleton<OutgoingMessageHandler>()
                     .RegisterAsSingleton<IncomingMessageRepository>()
                     .RegisterAsSingleton<OutgoingMessageRepository>()
                     .RegisterAsSingleton<IChannelRepository, ChannelRepository>()
                     .RegisterAsSingleton<IChannelPersister, InMemoryChannelPersister>()
                     .RegisterAsSingleton(Configuration);

            Configuration.Settings = new ExpandoObject();
        }

        public void StartHub()
        {
            Container.Resolve<ISignalRHostStarter>().Start(Configuration.DependencyResolver);
        }
    }
}
