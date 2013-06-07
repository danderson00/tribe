using System.Data.Entity;
using Tribe.MessageHub.ChannelPersisters.SqlServer.Model;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.ChannelPersisters.SqlServer
{
    public class TribeMessageHubDbContext : DbContext
    {
        public TribeMessageHubDbContext(IConfiguration configuration)
            : base((string)configuration.Settings.SqlServerPersistenceConnectionStringOrName) { }

        public DbSet<ChannelMessage> ChannelMessages { get; set; }
    }
}
