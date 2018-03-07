using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;

namespace MyClientsBase.Helpers
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<User, UserDto>();
      CreateMap<UserDto, User>();

      CreateMap<Client, ClientDto>();
      CreateMap<ClientDto, Client>();
    }
  }
}
