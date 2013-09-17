using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Tribe.MessageHub.Containers.Unity;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.ChannelPersisters.SqlServer;

namespace Reference
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapRoute(
                "Default",                                              
                "{controller}/{action}/{id}",                           
                new { controller = "Home", action = "Index", id = "" }  
            );

            ConfigureHub.With()
                        .Unity()
                        .StartHub();
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (Context.Request.FilePath == "/") Context.RewritePath("index.html");
        }
    }
}