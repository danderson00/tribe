namespace Tribe.MessageHub.Interfaces
{
    public interface IMessageSerialiser
    {
        string SerialiseMessage(object message, string topic);
        dynamic DeserialiseMessage(string message);
    }
}
