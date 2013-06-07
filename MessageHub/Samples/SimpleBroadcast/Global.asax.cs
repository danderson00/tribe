using System;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;

namespace SimpleBroadcast
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureHub.With().Unity().StartHub();
        }
    }
}