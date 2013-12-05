using System.Reflection;
using Microsoft.AspNet.SignalR;
using Tribe.SignalR.Interfaces;
namespace Tribe.SignalR.Tests.Infrastructure
{
    public class TestConfiguration : IConfiguration
    {
        public Assembly[] MessageAssemblies { get; set; }
        public IDependencyResolver DependencyResolver { get; set; }
        public dynamic Settings { get; set; }

        public TestConfiguration()
        {
            MessageAssemblies = new [] { GetType().Assembly };
        }
    }
}