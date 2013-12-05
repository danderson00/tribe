using System.Data.Entity;
using Tribe.SignalR.ChannelPersisters.SqlServer.Model;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.ChannelPersisters.SqlServer
{
    public class TribeMessageHubDbContext : DbContext
    {
        public TribeMessageHubDbContext(IConfiguration configuration)
            : base((string)configuration.Settings.SqlServerPersistenceConnectionStringOrName) { }

        public DbSet<ChannelMessage> ChannelMessages { get; set; }
    }
}
