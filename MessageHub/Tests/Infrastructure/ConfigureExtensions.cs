using Microsoft.AspNet.SignalR;
using NSubstitute;
using Tribe.MessageHub.Core.Configuration;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Tests.Infrastructure
{
    public static class ConfigureExtensions
    {
        public static IConfigure MockContainer(this IConfigureContainer configureContainer)
        {
            var configure = (ConfigureHub)configureContainer;
            configure.SetContainer(Substitute.For<IContainer>(), Substitute.For<IDependencyResolver>());
            return configure;
        }

    }
}