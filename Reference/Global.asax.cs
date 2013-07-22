using System;
using System.Web;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.ChannelPersisters.SqlServer;

namespace Reference
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureHub.With()
                        .Unity()
                        .SqlServerPersistence("Channels")
                        .StartHub();
        }
    }
}