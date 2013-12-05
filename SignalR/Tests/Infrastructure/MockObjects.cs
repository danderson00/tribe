using System;
using Tribe.SignalR.Interfaces;

namespace Tribe.SignalR.Tests.Infrastructure
{
    public interface ITestClient { void acceptServerMessage(string message); }

    public class TestOutgoingMessage : IOutgoingMessage {
        public string channelId { get; set; }
    }

    public class TestIncomingMessage : IIncomingMessage {
        public string data { get; set; }
        public string Username { get; set; }
    }

    public class TestMessageSerialiser : IMessageSerialiser 
    {
        public string SerialiseMessage(object message, string topic) { return null; }
        public dynamic DeserialiseMessage(string message) { return null; }
    }

    public class TestTopicResolver : IMessageTopicResolver
    {
        public string GetMessageTopic(Type type) { return null; }
    }
}