using Microsoft.AspNet.SignalR;
using NSubstitute;
using Tribe.SignalR.Core.Configuration;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Tests.Infrastructure
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