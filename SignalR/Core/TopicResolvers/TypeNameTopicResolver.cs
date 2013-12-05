using System;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.TopicResolvers
{
    public class TypeNameTopicResolver : IMessageTopicResolver
    {
        public string GetMessageTopic(Type type)
        {
            return type.Name;
        }
    }
}
