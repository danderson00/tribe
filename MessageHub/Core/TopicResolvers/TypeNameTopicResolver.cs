using System;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.TopicResolvers
{
    public class TypeNameTopicResolver : IMessageTopicResolver
    {
        public string GetMessageTopic(Type type)
        {
            return type.Name;
        }
    }
}
