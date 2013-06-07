using NServiceBus;
using Tribe.MessageHub.Core.OutgoingMessages;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Buses.NServiceBus
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
