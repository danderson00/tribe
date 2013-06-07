﻿using System.Collections.Generic;
using Microsoft.AspNet.SignalR;

namespace Tribe.MessageHub.Interfaces
{
    public interface IConfigure
    {
        IContainer Container { get; }
        void SetContainer(IContainer container, IDependencyResolver resolver);
        IConfiguration Configuration { get; set; }
        void StartHub();
    }
}
