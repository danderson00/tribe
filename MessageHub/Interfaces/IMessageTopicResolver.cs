using System;

namespace Tribe.MessageHub.Interfaces
{
    public interface IMessageTopicResolver
    {
        string GetMessageTopic(Type type);
    }
}
