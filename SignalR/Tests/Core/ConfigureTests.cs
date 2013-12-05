using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Core;
using Tribe.SignalR.Core.Configuration;
using Tribe.SignalR.Core.Serialisers;
using Tribe.SignalR.Core.TopicResolvers;
using Tribe.SignalR.Interfaces;
using Tribe.SignalR.Tests.Infrastructure;
using System.Reflection;

namespace Tribe.SignalR.Tests.Core
{
    [TestFixture]
    public class ConfigureTests
    {
        private IConfigure Config { get; set; }

        [SetUp]
        public void Setup()
        {
            Config = ConfigureHub.With().MockContainer();
        }

        [Test]
        public void Configure_sets_default_values()
        {
            Config.Container.Received().RegisterService<IMessageSerialiser, JsonMessageSerialiser>();
            Config.Container.Received().RegisterService<IMessageTopicResolver, TypeNameTopicResolver>();
            Config.Container.Received().RegisterService<IMessageBus, NullMessageBus>();
        }

        [Test]
        public void Configure_sets_correct_values()
        {
            Config
                .MessagesFrom(GetType().Assembly)
                .MessageSerialiser<TestMessageSerialiser>()
                .TopicResolver<TestTopicResolver>();

            Assembly[] assemblies = Config.Configuration.MessageAssemblies;
            assemblies.Should().Contain(GetType().Assembly);
            Config.Container.Received().RegisterService<IMessageSerialiser, TestMessageSerialiser>();
            Config.Container.Received().RegisterService<IMessageTopicResolver, TestTopicResolver>();
        }
    }
}