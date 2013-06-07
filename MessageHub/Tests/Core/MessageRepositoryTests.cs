using System.Linq;
using FluentAssertions;
using NUnit.Framework;
using Tribe.MessageHub.Core.IncomingMessages;
using Tribe.MessageHub.Core.OutgoingMessages;
using Tribe.MessageHub.Core.TopicResolvers;
using Tribe.MessageHub.Tests.Infrastructure;

namespace Tribe.MessageHub.Tests.Core
{
    [TestFixture]
    public class MessageRepositoryTests
    {
        [Test]
        public void IncomingMessageRepository_maps_types_correctly()
        {
            var repository = new IncomingMessageRepository(new TypeNameTopicResolver(), new TestConfiguration());
            repository.Messages.Count.Should().Be(1);
            repository.Messages.Keys.ElementAt(0).Should().Be("TestIncomingMessage");
            repository.Messages.Values.ElementAt(0).Should().Be(typeof(TestIncomingMessage));
        }

        [Test]
        public void OutgoingMessageRepository_maps_types_correctly()
        {
            var repository = new OutgoingMessageRepository(new TypeNameTopicResolver(), new TestConfiguration());
            repository.Messages.Count.Should().Be(1);
            repository.Messages.Keys.ElementAt(0).Should().Be(typeof(TestOutgoingMessage));
            repository.Messages.Values.ElementAt(0).Should().Be("TestOutgoingMessage");
        }

    }
}