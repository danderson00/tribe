using System;
using Messages;
using NServiceBus;
using log4net;

namespace Service
{
    public class ChatMessageHandler : IHandleMessages<ChatMessage>
    {
        public void Handle(ChatMessage message)
        {
            Logger.Info(string.Format(@"Message ""{0}""", message.message));
        }

        private static readonly ILog Logger = LogManager.GetLogger(typeof(ChatMessageHandler));
    }
}
