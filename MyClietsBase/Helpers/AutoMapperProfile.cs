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

      CreateMap<Order, OrderInfoDto>();


      //CreateMap<ProductsReport, ProductsReportDto>();
      //CreateMap<ProductsReportDto, ProductsReport>();

      CreateMap<OutgoingDto, Outgoing>();
      CreateMap<Outgoing, OutgoingDto>();

      CreateMap<Message, MessageDto>();
      CreateMap<MessageDto, Message>();

      CreateMap<BonusIncome, BonusIncomeDto>();
      CreateMap<BonusIncomeDto, BonusIncome>();

      CreateMap<Store, StoreDto>();
      CreateMap<StoreDto, Store>();
      //CreateMap<StoreDto, Store>();
    }
  }
}
