using System;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core
{
    public class NullMessageBus : IMessageBus
    {
        public void Send(object message) { }
        public void Subscribe(params Type[] messageType) { }
    }
}
