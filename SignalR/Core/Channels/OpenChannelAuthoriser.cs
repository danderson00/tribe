using System.Security.Principal;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.Channels
{
    public class OpenChannelAuthoriser : IChannelAuthoriser
    {
        public bool Authorise(IPrincipal user, string channelId, ChannelOperation operation)
        {
            return true;
        }
    }
}
