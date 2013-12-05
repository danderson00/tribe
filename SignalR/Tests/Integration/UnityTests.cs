using NSubstitute;
using NUnit.Framework;
using Newtonsoft.Json;
using Tribe.SignalR.Tests.Infrastructure;

namespace Tribe.SignalR.Tests.Integration
{
    [TestFixture]
    public class UnityTests : IntegrationTestBase
    {
        [Test] // this is really a test of the base class. It uses Unity.
        public void Unity_resolves_message_hub_and_publishes_to_client()
        {
            var message = JsonConvert.SerializeObject(new { data = new TestIncomingMessage(), topic = "TestIncomingMessage"});
            Hub.Publish("0", message, false);
            Client.Received().acceptServerMessage(Arg.Is(message));
        }
    }
}