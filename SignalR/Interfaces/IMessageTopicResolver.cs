using System;

namespace Tribe.SignalR.Interfaces
{
    public interface IMessageTopicResolver
    {
        string GetMessageTopic(Type type);
    }
}
