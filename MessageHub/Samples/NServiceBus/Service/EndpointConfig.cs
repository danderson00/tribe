using NServiceBus;

namespace Service 
{
    public class EndpointConfig : IConfigureThisEndpoint, AsA_Publisher, IWantCustomInitialization {
        public void Init()
        {
            Configure.With()
                .DefaultBuilder()
                .JsonSerializer();
        }
    }
}