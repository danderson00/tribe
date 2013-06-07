using System.Security.Principal;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.Channels
{
    public class OpenChannelAuthoriser : IChannelAuthoriser
    {
        public bool Authorise(IPrincipal user, string channelId, ChannelOperation operation)
        {
            return true;
        }
    }
}
