using FluentAssertions;
using Microsoft.Practices.Unity;
using NSubstitute;
using NUnit.Framework;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core;
using Tribe.MessageHub.Core.Channels;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.Core.Serialisers;
using Tribe.MessageHub.Core.TopicResolvers;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Tests.Unity
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