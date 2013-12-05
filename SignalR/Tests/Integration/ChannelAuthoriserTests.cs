using System.Security.Principal;
using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Interfaces;
using Microsoft.Practices.Unity;
using Tribe.SignalR.Tests.Infrastructure;

namespace Tribe.SignalR.Tests.Integration
{
    [TestFixture]
    public class HubChannelAuthoriserTests : IntegrationTestBase
    {
        [Test]
        public void Join_does_not_join_channel_if_authorisation_fails()
        {
            Container.RegisterInstance<IChannelAuthoriser>(new TestChannelAuthoriser { Operation = ChannelOperation.Join });

            Hub.JoinChannel("1");
            Hub.Publish("1", Message.Create("test", "1"), false);
            Client.DidNotReceive().acceptServerMessage(Arg.Any<string>());
        }

        public class TestChannelAuthoriser : IChannelAuthoriser
        {
            public ChannelOperation Operation { get; set; }

            public bool Authorise(IPrincipal user, string channelId, ChannelOperation operation)
            {
                return operation != Operation;
            }
        }
    }
}