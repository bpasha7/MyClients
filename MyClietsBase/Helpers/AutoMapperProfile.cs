using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Data.Reports;
using System;

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
      #region Product
      CreateMap<Product, ProductDto>();
      CreateMap<ProductDto, Product>();

      CreateMap<Product, StoreProductDto>();
      #endregion

      CreateMap<Discount, DiscountDto>();
      CreateMap<DiscountDto, Discount>();

      CreateMap<Order, OrderDto>()
        .ForMember(o => o.Date, b => b.MapFrom(z => DateTime.SpecifyKind(z.Date, DateTimeKind.Utc)));
      CreateMap<OrderDto, Order>();
      CreateMap<Order, OrderInfoDto>()
        .ForMember(o => o.Date, b => b.MapFrom(z => DateTime.SpecifyKind(z.Date, DateTimeKind.Utc)));


      //CreateMap<ProductsReport, ProductsReportDto>();
      //CreateMap<ProductsReportDto, ProductsReport>();

      CreateMap<OutgoingDto, Outgoing>();
      CreateMap<Outgoing, OutgoingDto>();

      CreateMap<Message, MessageDto>();
      CreateMap<MessageDto, Message>();

      CreateMap<BonusIncome, BonusIncomeDto>();
      CreateMap<BonusIncomeDto, BonusIncome>();
      #region Store
      CreateMap<Store, StoreDto>();
      CreateMap<StoreDto, Store>();

      CreateMap<Store, StoreForClientDto>();
      #endregion
    }
  }
}
