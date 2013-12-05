namespace Tribe.SignalR.Interfaces
{
    public interface IContainer
    {
        IContainer RegisterService<TFrom, TTo>(bool singleton = false) where TTo : TFrom;
        IContainer RegisterAsSingleton<T>();
        IContainer RegisterAsSingleton<TFrom, TTo>() where TTo : TFrom;
        IContainer RegisterAsSingleton<T>(T instance);
        T Resolve<T>();
    }
}
