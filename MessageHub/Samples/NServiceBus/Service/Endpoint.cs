using System;
using Messages;
using NServiceBus;

namespace Service
{
    public class Endpoint : IWantToRunAtStartup
    {
        public IBus Bus { get; set; }

        public void Run()
        {
            Console.WriteLine("Enter messages to publish. To exit, Ctrl + C");

            for (var input = Console.ReadLine(); !string.IsNullOrEmpty(input); input = Console.ReadLine())
            {
                var message = new ChatMessage();
                message.message = input;
                Bus.Publish(message);
                Console.WriteLine("Published message: {0}.", input);
            }
        }

        public void Stop()
        {
        }
    }
}
