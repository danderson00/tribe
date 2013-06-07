using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.OutgoingMessages
{
    public class OutgoingMessageHandler
    {
        private OutgoingMessageRepository MessageRepository { get; set; }
        private IChannelRepository ChannelRepository { get; set; }
        private IMessageSerialiser Serialiser { get; set; }

        public OutgoingMessageHandler(OutgoingMessageRepository messageRepository, IChannelRepository channelRepository, IMessageSerialiser serialiser)
        {
            MessageRepository = messageRepository;
            ChannelRepository = channelRepository;
            Serialiser = serialiser;
        }

        public void Publish(IOutgoingMessage message)
        {
            if (MessageRepository.Contains(message.GetType()))
                ChannelRepository.Publish(null, message.channelId, Serialiser.SerialiseMessage(message, MessageRepository.Messages[message.GetType()]), false);
        }
    }
}
