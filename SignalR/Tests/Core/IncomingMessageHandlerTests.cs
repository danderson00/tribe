using NSubstitute;
using NUnit.Framework;
using Newtonsoft.Json;
using Tribe.SignalR.Core.IncomingMessages;
using Tribe.SignalR.Core.Serialisers;
using Tribe.SignalR.Core.TopicResolvers;
using Tribe.SignalR.Interfaces;
using Tribe.SignalR.Tests.Infrastructure;

namespace Tribe.SignalR.Tests.Core
{
    [TestFixture]
    public class IncomingMessageHandlerTests
    {
        private IMessageBus Bus;
        private IncomingMessageRepository Repository;
        private IncomingMessageHandler Handler;

        [SetUp]
        public void Setup()
        {
            Bus = Substitute.For<IMessageBus>();
            Repository = new IncomingMessageRepository(new TypeNameTopicResolver(), new TestConfiguration());
            Handler = new IncomingMessageHandler(Bus, Repository, new JsonMessageSerialiser());
        }

        [Test]
        public void Publish_publishes_IIncomingMessage_internally()
        {
            Handler.Publish(JsonConvert.SerializeObject(new { data = new TestIncomingMessage(), topic = "TestIncomingMessage" }));
            Bus.Received().Send(Arg.Any<IIncomingMessage>());
        }

        [Test]
        public void Publish_does_not_publish_other_messages_internally()
        {
            Handler.Publish(JsonConvert.SerializeObject(new { data = new TestOutgoingMessage(), topic = "TestOutgoingMessage" }));
            Bus.DidNotReceive().Send(Arg.Any<object>());
        }

        [Test]
        public void Publish_deserialises_to_mapped_type()
        {
            Handler.Publish(JsonConvert.SerializeObject(new { data = new TestIncomingMessage(), topic = "TestIncomingMessage" }));
            Bus.Received().Send(Arg.Any<TestIncomingMessage>());
        }

    }
}