using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.ChannelPersisters.SqlServer
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
