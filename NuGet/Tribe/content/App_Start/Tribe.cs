using Tribe.MessageHub.ChannelPersisters.SqlServer;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;

[assembly: WebActivatorEx.PreApplicationStartMethod(
    typeof(Tribe.App_Start), "StartHub")]

namespace Tribe
{
    public static class App_Start
    {
        public static void StartHub()
        {
            ConfigureHub.With()
                .Unity()
                //.SqlServerPersistence("connectionStringOrName")
                .StartHub();
        }
    }
}