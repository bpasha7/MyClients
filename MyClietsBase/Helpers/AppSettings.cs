namespace MyClientsBase.Helpers
{
  public class AppSettings
  {
    public string ConnectionString { get; set; }
    public string Secret { get; set; }
    public string PhotoFolder { get; set; }
    public string ConfirmUrl { get; set; }
    public int PassDaysExpired { get; set; }
    public long MaxImageSize { get; set; }
    public int PhotoSize { get; set; }
    public int PhotoProductSize { get; set; }
    public BounusesList Bonuses { get; set; }
    public BounusTypes BonusTypes { get; set; }
    public BonusLimitPerDay BonusLimitPerDay { get; set; }
    public SmtpServer SmtpServer { get; set; }

  }
  public class BounusesList
  {
    public decimal NewClient { get; set; }
    public decimal NewPrice { get; set; }
    public decimal NewOutgoing { get; set; }
    public decimal NewOrder{ get; set; }
    public decimal Login{ get; set; }
    public decimal Prolong { get; set; }
  }
  public class BounusTypes
  {
    public int NewClient { get; set; }
    public int NewPrice { get; set; }
    public int NewOutgoing { get; set; }
    public int NewOrder { get; set; }
    public int Login { get; set; }
    public int Prolong { get; set; }

  }
  public class BonusLimitPerDay
  {
    public int NewClient { get; set; }
    public int NewPrice { get; set; }
    public int NewOutgoing { get; set; }
    public int NewOrder { get; set; }
    public int Login { get; set; }
    public int Prolong { get; set; }


  }
  public class SmtpServer
  {
    public string Host { get; set; }
    public string Account { get; set; }
    public string Password { get; set; }
    public int Port { get; set; }
  }
  //public class Bounus
  //{
  //  public string Name { get; set; }
  //  public decimal Value { get; set; }
  //}
}
