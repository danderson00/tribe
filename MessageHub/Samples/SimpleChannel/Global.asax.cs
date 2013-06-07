using System;
using Tribe.MessageHub.ChannelPersisters.SqlServer;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;

namespace SimpleChannel
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureHub.With()
                .Unity()
                .SqlServerPersistence("Data Source=.;Initial Catalog=SimpleChannel;User Id=mvc;Password=qweqwe")
                .StartHub();
        }
    }
}