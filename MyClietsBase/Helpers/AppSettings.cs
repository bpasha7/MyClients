namespace MyClientsBase.Helpers
{
  public class AppSettings
  {
    public string ConnectionString { get; set; }
    public string Secret { get; set; }
    public int PassDaysExpired { get; set; }
  }
}
