using System;
using System.Collections.Generic;
using System.Linq;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.IncomingMessages
{
    public class IncomingMessageRepository
    {
        public IDictionary<string, Type> Messages { get; set; }

        public IncomingMessageRepository(IMessageTopicResolver topicResolver, IConfiguration configuration)
        {
            Messages = configuration.MessageAssemblies == null ? new Dictionary<string, Type>() : 
                configuration.MessageAssemblies
                    .SelectMany(x => x.GetExportedTypes())
                    .Where(x => typeof(IIncomingMessage).IsAssignableFrom(x))
                    .ToDictionary(topicResolver.GetMessageTopic, x => x);
        }

        public bool Contains(string topic)
        {
            return Messages.ContainsKey(topic);
        }
    }
}
