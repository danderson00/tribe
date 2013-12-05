using System.Collections.Generic;

namespace Tribe.SignalR.Interfaces
{
    public interface IChannelPersister
    {
        //void CreateChannel(string channelId);
        void DeleteChannel(string channelId);
        void PersistMessage(string channelId, string message);
        List<string> RetrieveMessages(string channelId);
    }
}
