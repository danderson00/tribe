using System;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.TopicResolvers
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
