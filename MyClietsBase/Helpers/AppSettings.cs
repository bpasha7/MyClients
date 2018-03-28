namespace MyClientsBase.Helpers
{
  public class AppSettings
  {
    public string ConnectionString { get; set; }
    public string Secret { get; set; }
    public string PhotoFolder { get; set; }
    public string IsUser { get; set; }
    public int PassDaysExpired { get; set; }

  }
}
