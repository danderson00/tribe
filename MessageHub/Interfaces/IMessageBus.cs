using System;

namespace Tribe.MessageHub.Interfaces
{
    public interface IMessageBus
    {
        void Send(object message);
        void Subscribe(params Type[] messageType);
    }
}
