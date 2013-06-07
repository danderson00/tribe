using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using NSubstitute;
using NUnit.Framework;
using Tribe.MessageHub.Tests.Infrastructure;

namespace Tribe.MessageHub.Tests.Integration
{
    [TestFixture]
    public class ChannelRepositoryTests : IntegrationTestBase
    {
        [Test]
        public void Recorded_channel_messages_replay_when_requested()
        {
            Hub.JoinChannel("1");
            Hub.Publish("1", Message.Create("test"), true);
            Hub.Publish("1", Message.Create("test2"), true);
            Hub.Publish("1", Message.Create("test3"), false);
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());

            Hub.Context = new HubCallerContext(Substitute.For<IRequest>(), "2");
            Hub.JoinChannel("1");
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());
            Hub.ReplayChannel("1");
            Client.Received().acceptServerMessage(Message.Create("test"));
            Client.Received().acceptServerMessage(Message.Create("test2"));
        }

        [Test]
        public void Caller_must_join_channel_to_replay()
        {
            Hub.JoinChannel("1");
            Hub.Publish("1", Message.Create("test"), true);
            Hub.Publish("1", Message.Create("test2"), true);
            Hub.Publish("1", Message.Create("test3"), false);
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());

            Hub.Context = new HubCallerContext(Substitute.For<IRequest>(), "2");
            Hub.ReplayChannel("1");
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());
        }
    }
}