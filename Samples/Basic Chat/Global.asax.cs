using System.Web;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.ChannelPersisters.SqlServer;

namespace Chat
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            ConfigureHub.With()
                .Unity()
                .SqlServerPersistence("Chat")
                .StartHub();
        }
    }
}