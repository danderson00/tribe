using Microsoft.Practices.Unity;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Containers.Unity
{
    public class UnityContainerWrapper : IContainer
    {
        private IUnityContainer Container { get; set; }

        public UnityContainerWrapper(IUnityContainer container)
        {
            Container = container;
        }

        public IContainer RegisterService<TFrom, TTo>(bool singleton = false) where TTo : TFrom
        {
            LifetimeManager lifetime = singleton ? (LifetimeManager) new ContainerControlledLifetimeManager() : new TransientLifetimeManager();
            Container.RegisterType<TFrom, TTo>(lifetime);
            return this;
        }

        public IContainer RegisterAsSingleton<T>()
        {
            Container.RegisterType<T>(new ContainerControlledLifetimeManager());
            return this;
        }

        public IContainer RegisterAsSingleton<TFrom, TTo>() where TTo : TFrom
        {
            Container.RegisterType<TFrom, TTo>(new ContainerControlledLifetimeManager());
            return this;
        }

        public IContainer RegisterAsSingleton<T>(T instance)
        {
            Container.RegisterInstance(instance);
            return this;
        }

        public T Resolve<T>()
        {
            return Container.Resolve<T>();
        }
    }
}
