using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Tribe.SignalR.Core.IncomingMessages;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core
{
    public class HubImplementation : Hub
    {
        private IChannelAuthoriser ChannelAuthoriser { get; set; }
        private IChannelRepository ChannelRepository { get; set; }
        private IncomingMessageHandler Handler { get; set; }

        public HubImplementation(IChannelAuthoriser channelAuthoriser, IChannelRepository channelRepository, IncomingMessageHandler handler)
        {
            ChannelAuthoriser = channelAuthoriser;
            ChannelRepository = channelRepository;
            Handler = handler;
        }

        public bool Publish(string channelId, string message, bool record)
        {
            if (!ChannelAuthoriser.Authorise(Context.User, channelId, ChannelOperation.Publish))
                return false;

            Handler.Publish(message);
            ChannelRepository.Publish(Context.ConnectionId, channelId, message, record);
            return true;
        }

        public bool JoinChannel(string channelId)
        {
            if (!ChannelAuthoriser.Authorise(Context.User, channelId, ChannelOperation.Join))
                return false;

            ChannelRepository.Join(Context.ConnectionId, channelId, Clients.Caller);
            return true;
        }

        public void ReplayChannel(string channelId)
        {
            ChannelRepository.Replay(Context.ConnectionId, channelId, Clients.Caller);
        }

        public void LeaveChannel(string channelId)
        {
            ChannelRepository.Leave(Context.ConnectionId, channelId);
        }

        public override Task OnDisconnected()
        {
            ChannelRepository.Leave(Context.ConnectionId);
            return base.OnDisconnected();
        }

    }
}