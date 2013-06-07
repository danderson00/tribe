using Microsoft.AspNet.SignalR.Hubs;
using NSubstitute;
using NUnit.Framework;
using Newtonsoft.Json;
using Microsoft.AspNet.SignalR;

namespace Tribe.MessageHub.Tests.Integration
{
    [TestFixture]
    public class MessageHubTests : IntegrationTestBase
    {
        [Test]
        public void Publish_publishes_message_to_client()
        {
            var message = JsonConvert.SerializeObject(new {topic = "TestOutgoingMessage"});
            Hub.Publish("0", message, false);
            Client.Received().acceptServerMessage(Arg.Is(message));
        }

        [Test]
        public void Publish_does_not_publish_message_to_calling_client()
        {
            var message = JsonConvert.SerializeObject(new { topic = "TestOutgoingMessage" });
            Hub.Context = new HubCallerContext(Substitute.For<IRequest>(), "0");
            Hub.Publish("0", message, false);
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());
        }
    }
}