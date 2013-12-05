namespace Tribe.SignalR.Interfaces
{
    public interface IChannelRepository
    {
        void Join(string connectionId, string channelId, dynamic client);
        void Replay(string connectionId, string channelId, dynamic client);
        void Leave(string connectionId, string channelId = null);
        void Publish(string connectionId, string channelId, string message, bool record);
    }
}
