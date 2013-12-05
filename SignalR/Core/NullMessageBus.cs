using System;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core
{
    public class NullMessageBus : IMessageBus
    {
        public void Send(object message) { }
        public void Subscribe(params Type[] messageType) { }
    }
}
