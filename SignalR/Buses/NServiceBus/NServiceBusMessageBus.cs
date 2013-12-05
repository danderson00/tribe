using System;
using System.Linq;
using NServiceBus;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Buses.NServiceBus
{
    public class NServiceBusMessageBus : IMessageBus
    {
        private IBus Bus { get; set; }

        public NServiceBusMessageBus(IBus bus)
        {
            Bus = bus;
        }

        public void Send(object message)
        {
            Bus.Send(message);
        }

        public void Subscribe(params Type[] messageTypes)
        {
            messageTypes.ToList().ForEach(Bus.Subscribe);
        }
    }
}
