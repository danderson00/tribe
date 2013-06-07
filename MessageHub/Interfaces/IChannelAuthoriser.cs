using System.Security.Principal;

namespace Tribe.MessageHub.Interfaces
{
    public interface IChannelAuthoriser
    {
        bool Authorise(IPrincipal user, string channelId, ChannelOperation operation);
    }
}
