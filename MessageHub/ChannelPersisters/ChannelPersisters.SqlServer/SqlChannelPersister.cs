using System.Collections.Generic;
using System.Linq;
using Microsoft.Practices.Unity;
using Tribe.MessageHub.ChannelPersisters.SqlServer.Model;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.ChannelPersisters.SqlServer
{
    public class SqlChannelPersister : IChannelPersister
    {
        private IUnityContainer Container { get; set; }

        public SqlChannelPersister(IUnityContainer container)
        {
            Container = container;
        }

        public void Initialise()
        {
            Container.Resolve<TribeMessageHubDbContext>().Database.CreateIfNotExists();
        }

        public void DeleteChannel(string channelId)
        {
            Container.Resolve<TribeMessageHubDbContext>().Database.SqlQuery<ChannelMessage>("DELETE FROM ChannelMessages WHERE ChannelId = @ChannelId", channelId);
        }

        public void PersistMessage(string channelId, string message)
        {
            var context = Container.Resolve<TribeMessageHubDbContext>();
            context.ChannelMessages.Add(new ChannelMessage {ChannelId = channelId, Message = message});
            context.SaveChanges();
        }

        public List<string> RetrieveMessages(string channelId)
        {
            return Container.Resolve<TribeMessageHubDbContext>().ChannelMessages
                .Where(x => x.ChannelId == channelId)
                .Select(x => x.Message)
                .ToList();
        }
    }
}
