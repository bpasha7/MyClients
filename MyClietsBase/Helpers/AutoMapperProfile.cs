using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Data.Reports;

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

      CreateMap<Product, ProductDto>();
      CreateMap<ProductDto, Product>();

      CreateMap<Discount, DiscountDto>();
      CreateMap<DiscountDto, Discount>();

      CreateMap<Order, OrderDto>();
      CreateMap<OrderDto, Order>();

      CreateMap<ProductsReport, ProductsReportDto>();
      CreateMap<ProductsReportDto, ProductsReport>();

      CreateMap<OutgoingDto, Outgoing>();
      CreateMap<Outgoing, OutgoingDto>();
    }
  }
}
