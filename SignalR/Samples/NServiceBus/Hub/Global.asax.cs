using Messages;
using Microsoft.Practices.Unity;
using NServiceBus;
using System;
using Tribe.SignalR.Buses.NServiceBus;
using Tribe.SignalR.Containers.Unity;
using Tribe.SignalR.Core.Configuration;
using log4net.Appender;

namespace Hub
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            var container = new UnityContainer();

            var bus = Configure.With()
                .UnityBuilder(container)
                .Log4Net<DebugAppender>(x => x.ActivateOptions())
                .JsonSerializer()
                .MsmqTransport()
                .MsmqSubscriptionStorage()
                .UnicastBus()
                .LoadMessageHandlers()
                .CreateBus()
                .Start(() => Configure.Instance.ForInstallationOn<NServiceBus.Installation.Environments.Windows>().Install());

            ConfigureHub.With()
                .Unity(container)
                .MessagesFrom(typeof(ChatMessage).Assembly)
                .NServiceBus(bus)
                .StartHub();
        }
    }
}