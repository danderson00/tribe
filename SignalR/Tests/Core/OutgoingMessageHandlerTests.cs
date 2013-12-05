using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Core.OutgoingMessages;
using Tribe.SignalR.Core.TopicResolvers;
using Tribe.SignalR.Interfaces;
using Tribe.SignalR.Tests.Infrastructure;

namespace Tribe.SignalR.Tests.Core
{
    [TestFixture]
    public class OutgoingMessageHandlerTests
    {
        private OutgoingMessageRepository MessageRepository;
        private IChannelRepository ChannelRepository;
        private IMessageSerialiser Serialiser;
        private OutgoingMessageHandler Handler;

        [SetUp]
        public void Setup()
        {
            MessageRepository = new OutgoingMessageRepository(new TypeNameTopicResolver(), new TestConfiguration());
            ChannelRepository = Substitute.For<IChannelRepository>();
            Serialiser = Substitute.For<IMessageSerialiser>();
            Handler = new OutgoingMessageHandler(MessageRepository, ChannelRepository, Serialiser);
        }

        [Test]
        public void Publish_calls_serialiser_with_message_and_topic()
        {
            var message = new TestOutgoingMessage();
            Handler.Publish(message);
            Serialiser.Received().SerialiseMessage(Arg.Is(message), Arg.Is("TestOutgoingMessage"));
        }

        [Test]
        public void Publish_calls_ClientRepository_Publish_with_serialised_message()
        {
            var message = new TestOutgoingMessage { channelId = "0" };
            Serialiser.SerialiseMessage(message, "TestOutgoingMessage").Returns("serialised");
            Handler.Publish(message);
            ChannelRepository.Received().Publish(Arg.Any<string>(), Arg.Is("0"), Arg.Is("serialised"), false);
        }
    }
}