using System.Security.Principal;

namespace Tribe.SignalR.Interfaces
{
    public interface IChannelAuthoriser
    {
        bool Authorise(IPrincipal user, string channelId, ChannelOperation operation);
    }
}
