using System.Collections.Generic;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.Channels
{
    public class InMemoryChannelPersister : IChannelPersister
    {
        private Dictionary<string, List<string>> Channels { get; set; }

        public InMemoryChannelPersister()
        {
            Channels = new Dictionary<string, List<string>>();
        }

        public void PersistMessage(string channelId, string message)
        {
            if (!Channels.ContainsKey(channelId))
                Channels.Add(channelId, new List<string>());
            Channels[channelId].Add(message);
        }

        public List<string> RetrieveMessages(string channelId)
        {
            if(Channels.ContainsKey(channelId))
                return Channels[channelId];
            return new List<string>();
        }

        public void DeleteChannel(string channelId)
        {
            Channels.Remove(channelId);
        }
    }
}
