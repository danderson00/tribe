using System;

namespace Tribe.SignalR.Interfaces
{
    public interface IMessageBus
    {
        void Send(object message);
        void Subscribe(params Type[] messageType);
    }
}
