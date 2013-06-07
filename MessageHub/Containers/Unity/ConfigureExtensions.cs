using Microsoft.Practices.Unity;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Containers.Unity
{
    public static class ConfigureExtensions
    {
        public static IConfigure Unity(this IConfigureContainer configureContainer, IUnityContainer container = null)
        {
            container = container ?? new UnityContainer();
            var configure = (IConfigure) configureContainer;
            configure.SetContainer(new UnityContainerWrapper(container), new SignalRUnityDependencyResolver(container));
            return configure;
        }
    }
}
