using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MyClientsBase
{
  public class ConfigurableStartup /*: Startup*/
  {
    private readonly Action<IServiceCollection> configureAction;

    //public ConfigurableStartup(IConfigurationRoot configuration, Action<IServiceCollection> configureAction)
    //    : base(configuration)
    //{
    //  this.configureAction = configureAction;
    //}

    //protected override void ConfigureAdditionalServices(IServiceCollection services)
    //{
    //  configureAction(services);
    //}
  }
}
