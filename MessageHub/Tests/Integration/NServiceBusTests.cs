using Microsoft.Practices.Unity;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;
using Tribe.MessageHub.Buses.NServiceBus;
using Tribe.MessageHub.Core.Serialisers;
using Tribe.MessageHub.Tests.Infrastructure;

namespace Tribe.MessageHub.Tests.Integration
{
    [TestFixture]
    public class NServiceBusTests : IntegrationTestBase
    {
        [Test]
        public void MessageHandler_publishes_IOutgoingMessage_to_clients()
        {
            var message = new TestOutgoingMessage { channelId = "0" };
            Container.Resolve<NServiceBusMessageHandler>().Handle(message);
            Client.Received().acceptServerMessage(Arg.Is(new JsonMessageSerialiser().SerialiseMessage(message, "TestOutgoingMessage")));
        }

        [Test]
        public void MessageHub_sends_IIncomingMessage_to_NServiceBus()
        {
            Hub.Publish("0", JsonConvert.SerializeObject(new { data = new TestIncomingMessage(), topic = "TestIncomingMessage" }), false);
            ServiceBus.Received().Send(Arg.Any<TestIncomingMessage>());
        }
    }
}