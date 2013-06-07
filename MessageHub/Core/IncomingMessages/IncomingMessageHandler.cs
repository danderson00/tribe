using System;
using Newtonsoft.Json;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.IncomingMessages
{
    public class IncomingMessageHandler
    {
        private IMessageBus Bus { get; set; }
        private IncomingMessageRepository Repository { get; set; }
        private IMessageSerialiser Serialiser { get; set; }

        public IncomingMessageHandler(IMessageBus bus, IncomingMessageRepository repository, IMessageSerialiser serialiser)
        {
            Bus = bus;
            Repository = repository;
            Serialiser = serialiser;
        }

        public void Publish(string message)
        {
            Publish(Serialiser.DeserialiseMessage(message));
        }

        public void Publish(dynamic envelope)
        {
            var topic = envelope.topic.ToString();

            if (Repository.Contains(topic))
                PublishInternally(topic, envelope.data);
        }

        private void PublishInternally(string topic, dynamic data)
        {
            var type = Repository.Messages[topic];
            Bus.Send(ConvertFromDynamic(type, data));
        }

        private IIncomingMessage ConvertFromDynamic(Type type, object source)
        {
            var json = JsonConvert.SerializeObject(source);
            var message = (IIncomingMessage) JsonConvert.DeserializeObject(json, type);
            return message;
        }
    }
}
