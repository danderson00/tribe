using FluentAssertions;
using Microsoft.Practices.Unity;
using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Containers.Unity;
using Tribe.SignalR.Core;
using Tribe.SignalR.Core.Channels;
using Tribe.SignalR.Core.Configuration;
using Tribe.SignalR.Core.Serialisers;
using Tribe.SignalR.Core.TopicResolvers;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Tests.Unity
{
    [TestFixture]
    public class ConfigureTests
    {
        private IUnityContainer Container;
        private IConfigure Config;

        [SetUp]
        public void Setup()
        {
            Container = Substitute.For<IUnityContainer>();
            Config = ConfigureHub.With().Unity(Container);   
        }

        [Test]
        public void Unity_sets_container_and_resolver()
        {
            Config.Container.Should().BeOfType<UnityContainerWrapper>();
            AssertionExtensions.Should((object) Config.Configuration.DependencyResolver).BeOfType<SignalRUnityDependencyResolver>();
        }

        [Test]
        public void Unity_sets_default_types_on_container()
        {
            Container.Received().RegisterType<IMessageSerialiser, JsonMessageSerialiser>(Arg.Any<TransientLifetimeManager>());
            Container.Received().RegisterType<IMessageTopicResolver, TypeNameTopicResolver>(Arg.Any<TransientLifetimeManager>());
        }

        [Test]
        public void Unity_registers_types_as_singleton()
        {
            Container.Received().RegisterType<IChannelRepository, ChannelRepository>(Arg.Any<ContainerControlledLifetimeManager>());
        }
    }
}