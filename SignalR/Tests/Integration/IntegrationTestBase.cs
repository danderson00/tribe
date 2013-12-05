using System.Threading;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Practices.Unity;
using NServiceBus;
using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Buses.NServiceBus;
using Tribe.SignalR.Containers.Unity;
using Tribe.SignalR.Core;
using Tribe.SignalR.Core.Configuration;
using Tribe.SignalR.Interfaces;
using Tribe.SignalR.Tests.Infrastructure;

namespace Tribe.SignalR.Tests.Integration
{
    public class IntegrationTestBase
    {
        protected UnityContainer Container;
        protected ITestClient Client;
        protected HubImplementation Hub;
        protected IBus ServiceBus;
        protected ISignalRHostStarter HostStarter;
        protected IConfigure ConfigureWith;
        protected IChannelRepository Channels;

        [SetUp]
        public void Setup()
        {
            ServiceBus = Substitute.For<IBus>();

            Container = new UnityContainer();
            ConfigureWith = ConfigureHub.With()
                .Unity(Container)
                .MessagesFrom(GetType().Assembly)
                .NServiceBus(ServiceBus);
            
            HostStarter = Substitute.For<ISignalRHostStarter>();
            Container.RegisterInstance(HostStarter);

            ConfigureWith.StartHub();

            Channels = Container.Resolve<IChannelRepository>();
            Client = Substitute.For<ITestClient>();
            Channels.Join("0", "0", Client);

            Hub = Container.Resolve<HubImplementation>();
            var request = Substitute.For<IRequest>();
            request.User.Returns(Thread.CurrentPrincipal);
            Hub.Context = new HubCallerContext(request, "");
            Hub.Clients.Caller = Client;
        }
    }
}