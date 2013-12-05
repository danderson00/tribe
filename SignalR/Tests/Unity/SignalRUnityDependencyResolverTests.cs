using FluentAssertions;
using Microsoft.Practices.Unity;
using NSubstitute;
using NUnit.Framework;
using Tribe.SignalR.Containers.Unity;

namespace Tribe.SignalR.Tests.Unity
{
    [TestFixture]
    public class SignalRUnityDependencyResolverTests
    {
        private IUnityContainer Container { get; set; }
        private SignalRUnityDependencyResolver Resolver { get; set; }

        [SetUp]
        public void Setup()
        {
            Container = Substitute.For<IUnityContainer>();
            Resolver = new SignalRUnityDependencyResolver(Container);
        }

        [Test]
        public void GetService_calls_Resolve()
        {
            Resolver.GetService(this.GetType());
            Container.Received().Resolve(this.GetType());
        }

        [Test]
        public void GetServices_calls_ResolveAll()
        {
            Resolver.GetServices(this.GetType());
            Container.Received().ResolveAll(this.GetType());
        }
    }
}