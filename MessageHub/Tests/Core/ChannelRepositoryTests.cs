using NSubstitute;
using NUnit.Framework;
using Tribe.MessageHub.Core.Channels;
using Tribe.MessageHub.Tests.Infrastructure;

namespace Tribe.MessageHub.Tests.Core
{
    [TestFixture]
    public class ChannelRepositoryTests
    {
        private ChannelRepository Repository { get; set; }
        private ITestClient[] Clients { get; set; }

        [SetUp]
        public void Setup()
        {
            Repository = new ChannelRepository(new InMemoryChannelPersister());
            Clients = new[] { Substitute.For<ITestClient>(), Substitute.For<ITestClient>(), Substitute.For<ITestClient>() };

            Repository.Join("0", "1", Clients[0]);
            Repository.Join("1", "1", Clients[1]);
            Repository.Join("2", "1", Clients[2]);
            Repository.Join("1", "2", Clients[1]);
            Repository.Join("2", "2", Clients[2]);
        }

        [Test]
        public void Publish_calls_acceptServerMessage_on_all_subscribers_except_publisher()
        {
            Repository.Publish("0", "1", "test", false);
            Clients[1].Received().acceptServerMessage("test");
            Clients[2].Received().acceptServerMessage("test");
        }

        [Test]
        public void Publish_calls_acceptServerMessage_only_on_subscribers()
        {
            Repository.Publish("1", "2", "test", false);
            Clients[0].DidNotReceive().acceptServerMessage("test");
        }

        [Test]
        public void Leave_removes_subscriber_from_specific_channel()
        {
            Repository.Leave("1", "1");
            Repository.Publish("0", "1", "test", false);
            Clients[2].Received().acceptServerMessage("test");
            Clients[1].DidNotReceive().acceptServerMessage("test");
        }

        [Test]
        public void Leave_removes_subscriber_from_all_channels()
        {
            Repository.Leave("1");
            Repository.Publish("2", "1", "test1", false);
            Repository.Publish("2", "2", "test2", false);
            Clients[1].DidNotReceive().acceptServerMessage("test1");
            Clients[1].DidNotReceive().acceptServerMessage("test2");
            Clients[0].Received().acceptServerMessage("test1");
        }
    }    
}