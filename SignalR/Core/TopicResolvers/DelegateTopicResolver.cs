using System;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.TopicResolvers
{
    public class DelegateTopicResolver : IMessageTopicResolver
    {
        public Func<Type, string> Resolver { get; set; }

        public DelegateTopicResolver(Func<Type, string> resolver)
        {
            Resolver = resolver;
        }

        public string GetMessageTopic(Type type)
        {
            return Resolver.Invoke(type);
        }
    }
}
