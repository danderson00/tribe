using NServiceBus;
using Tribe.SignalR.Interfaces;

namespace Messages
{
    public class ChatMessage : IMessage, IIncomingMessage, IOutgoingMessage
    {
        public string channelId { get; set; }
        public string message { get; set; }
    }
}
