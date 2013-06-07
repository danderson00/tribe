using Newtonsoft.Json;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.Serialisers
{
    public class JsonMessageSerialiser : IMessageSerialiser
    {
        public string SerialiseMessage(object message, string topic)
        {
            var clientMessage = new
            {
                topic = topic,
                data = message
            };
            return JsonConvert.SerializeObject(clientMessage);
        }

        public dynamic DeserialiseMessage(string message)
        {
            return JsonConvert.DeserializeObject<dynamic>(message);
        }
    }
}
