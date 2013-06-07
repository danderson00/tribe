using Newtonsoft.Json;
namespace Tribe.MessageHub.Tests.Infrastructure
{
    public class Message
    {
        public static string Create(string topic, string channelId = null)
        {
            return JsonConvert.SerializeObject(new { topic, channelId });
        }
    }
}