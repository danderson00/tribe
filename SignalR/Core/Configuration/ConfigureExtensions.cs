using System;
using System.Reflection;
using Tribe.SignalR.Core.TopicResolvers;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.Configuration
{
    public static class ConfigureExtensions
    {
        public static IConfigure TopicResolver<T>(this IConfigure configure) where T : IMessageTopicResolver
        {
            configure.Container.RegisterService<IMessageTopicResolver, T>();
            return configure;
        }

        public static IConfigure TopicResolver(this IConfigure configure, Func<Type, string> resolver)
        {
            configure.Container.RegisterAsSingleton<IMessageTopicResolver>(new DelegateTopicResolver(resolver));
            return configure;
        }

        public static IConfigure MessageSerialiser<T>(this IConfigure configure) where T : IMessageSerialiser
        {
            configure.Container.RegisterService<IMessageSerialiser, T>();
            return configure;
        }

        public static IConfigure MessageBus<T>(this IConfigure configure) where T : IMessageBus
        {
            configure.Container.RegisterService<IMessageBus, T>();
            return configure;
        }

        public static IConfigure MessagesFrom(this IConfigure configure, params Assembly[] assemblies)
        {
            configure.Configuration.MessageAssemblies = assemblies;
            return configure;
        }

        public static IConfigure HostStarter<T>(this IConfigure configure) where T : ISignalRHostStarter
        {
            configure.Container.RegisterService<ISignalRHostStarter, T>();
            return configure;
        }

        public static IConfigure ChannelAuthoriser<T>(this IConfigure configure) where T : IChannelAuthoriser
        {
            configure.Container.RegisterService<IChannelAuthoriser, T>();
            return configure;
        }
    }
}
