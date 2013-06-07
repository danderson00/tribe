using System;
using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using Microsoft.Practices.Unity;

namespace Tribe.MessageHub.Containers.Unity
{
    public class SignalRUnityDependencyResolver : DefaultDependencyResolver
    {
        private IUnityContainer container;

        public SignalRUnityDependencyResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container", "Container cannot be null");
            }
            this.container = container;
        }

        public override object GetService(Type serviceType)
        {
            return base.GetService(serviceType) ?? container.Resolve(serviceType);
        }

        public override IEnumerable<object> GetServices(Type serviceType)
        {
            return base.GetServices(serviceType) ?? container.ResolveAll(serviceType);
        }
    }
}