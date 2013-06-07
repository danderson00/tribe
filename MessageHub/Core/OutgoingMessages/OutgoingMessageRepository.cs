using System;
using System.Collections.Generic;
using System.Linq;
using Tribe.MessageHub.Interfaces;

namespace Tribe.MessageHub.Core.OutgoingMessages
{
    public class OutgoingMessageRepository
    {
        public IDictionary<Type, string> Messages { get; set; }

        public OutgoingMessageRepository(IMessageTopicResolver topicResolver, IConfiguration configuration)
        {
            Messages = configuration.MessageAssemblies == null ? new Dictionary<Type, string>() : 
                configuration.MessageAssemblies
                    .SelectMany(x => x.GetExportedTypes())
                    .Where(x => typeof (IOutgoingMessage).IsAssignableFrom(x))
                    .ToDictionary(x => x, topicResolver.GetMessageTopic);
        }

        public bool Contains(Type type)
        {
            return Messages.ContainsKey(type);
        }
    }
}
