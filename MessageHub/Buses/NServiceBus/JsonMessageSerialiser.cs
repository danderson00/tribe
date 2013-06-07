using System;
using System.IO;
using System.Text;
using NServiceBus.Serialization;
using Newtonsoft.Json;

namespace Tribe.MessageHub.Buses.NServiceBus
{
    class JsonMessageSerialiser : IMessageSerializer
    {
        public void Serialize(object[] messages, Stream stream)
        {
            var json = JsonConvert.SerializeObject(messages);
            var buffer = Encoding.Unicode.GetBytes(json);
            stream.Write(buffer, 0, buffer.Length);
        }

        public object[] Deserialize(Stream stream)
        {
            var buffer = new byte[stream.Length];
            stream.Read(buffer, 0, Convert.ToInt32(stream.Length));
            var json = Encoding.Unicode.GetString(buffer);
            return null;//JsonConvert
        }
    }
}
