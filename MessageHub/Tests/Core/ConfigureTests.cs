using FluentAssertions;
using NSubstitute;
using NUnit.Framework;
using Tribe.MessageHub.Core;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.Core.Serialisers;
using Tribe.MessageHub.Core.TopicResolvers;
using Tribe.MessageHub.Interfaces;
using Tribe.MessageHub.Tests.Infrastructure;
using System.Reflection;

namespace Tribe.MessageHub.Tests.Core
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