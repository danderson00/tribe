using System;
using Tribe.SignalR.ChannelPersisters.SqlServer;
using Tribe.SignalR.Containers.Unity;
using Tribe.SignalR.Core.Configuration;

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