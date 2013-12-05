using Newtonsoft.Json;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Core.Serialisers
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
