using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.ChannelPersisters.SqlServer
{
    public static class ConfigureExtensions
    {
        public static IConfigure SqlServerPersistence(this IConfigure configure, string connectionStringOrName)
        {
            configure.Configuration.Settings.SqlServerPersistenceConnectionStringOrName = connectionStringOrName;
            configure.Container.RegisterService<IChannelPersister, SqlChannelPersister>();
            configure.Container.Resolve<SqlChannelPersister>().Initialise();
            return configure;
        }
    }
}
