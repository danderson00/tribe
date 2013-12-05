//using System.Threading;
//using NSubstitute;
//using NUnit.Framework;
//using Newtonsoft.Json;
//using Tribe.SignalR.Tests.Infrastructure;

//namespace Tribe.SignalR.Tests.Integration
//{
//    [TestFixture]
//    public class IncomingMessageHandlerTests : IntegrationTestBase
//    {
//        // removed for now - this will likely become an interface instead of just a string username
//        [Test]
//        public void username_is_set_on_incoming_messages()
//        {
//            Hub.Publish(JsonConvert.SerializeObject(new { data = new { data = "test" }, topic = "TestIncomingMessage" }));
//            ServiceBus.Received().Send(Arg.Is<TestIncomingMessage>(x => x.Username == Thread.CurrentPrincipal.Identity.Name));
//        }
//    }
//}