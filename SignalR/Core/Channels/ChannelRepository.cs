using System.Collections.Generic;
using System.Linq;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.Channels
{
    public class ChannelRepository : IChannelRepository
    {
        private Dictionary<string, Dictionary<string, dynamic>> Channels { get; set; }
        private IChannelPersister Persister { get; set; }

        public ChannelRepository(IChannelPersister persister)
        {
            Channels = new Dictionary<string, Dictionary<string, dynamic>>();
            Persister = persister;
        }

        public void Join(string connectionId, string channelId, dynamic client)
        {
            if (!Channels.ContainsKey(channelId))
                Channels.Add(channelId, new Dictionary<string, dynamic>());

            Channels[channelId][connectionId] = client;
        }

        public void Replay(string connectionId, string channelId, dynamic client)
        {
            if (Channels.ContainsKey(channelId) && Channels[channelId].ContainsKey(connectionId))
                foreach (var message in Persister.RetrieveMessages(channelId))
                    client.acceptServerMessage(message);
        }

        public void Leave(string connectionId, string channelId = null)
        {
            if (channelId == null)
                Channels.Keys.ToList().ForEach(x => RemoveConnection(connectionId, x));
            else
                RemoveConnection(connectionId, channelId);
        }

        private void RemoveConnection(string connectionId, string channelId)
        {
            if (Channels.ContainsKey(channelId) && Channels[channelId].ContainsKey(connectionId))
            {
                Channels[channelId].Remove(connectionId);
                if (Channels[channelId].Count == 0)
                    Channels.Remove(channelId);
            }
        }

        public void Publish(string connectionId, string channelId, string message, bool record)
        {
            if (record)
                Persister.PersistMessage(channelId, message);

            foreach (dynamic client in GetClients(channelId, connectionId))
                client.acceptServerMessage(message);
        }

        private IEnumerable<dynamic> GetClients(string channelId, string callerId)
        {
            if (Channels.ContainsKey(channelId))
                return Channels[channelId]
                    .Where(x => x.Key != callerId)
                    .Select(x => x.Value);
            else
                return new object[] { };
        }
    }
}
