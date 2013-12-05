using NServiceBus;
using Tribe.SignalR.Core.OutgoingMessages;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Buses.NServiceBus
{
    public class NServiceBusMessageHandler : IHandleMessages<IOutgoingMessage>
    {
        private OutgoingMessageHandler MessageHandler { get; set; }

        public NServiceBusMessageHandler(OutgoingMessageHandler messageHandler)
        {
            MessageHandler = messageHandler;
        }

        public void Handle(IOutgoingMessage message)
        {
            MessageHandler.Publish(message);
        }
    }
}
