using System;
using Tribe.SignalR.Containers.Unity;
using Tribe.SignalR.Core.Configuration;

namespace SimpleComposite
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureHub.With().Unity().StartHub();
        }
    }
}