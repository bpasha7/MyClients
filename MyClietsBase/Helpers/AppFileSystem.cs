using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyClientsBase.Helpers
{
  static public class AppFileSystem
  {
    /// <summary>
    /// Getting user md5 hash for navigating in app file system 
    /// </summary>
    /// <param name="id">User Id</param>
    /// <param name="login">User Login</param>
    /// <returns></returns>
    public static string GetUserMD5(int id, string login)
    {
      using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
      {
        byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes($"{id}_{login}");
        byte[] hashBytes = md5.ComputeHash(inputBytes);

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < hashBytes.Length; i++)
        {
          sb.Append(hashBytes[i].ToString("X2"));
        }
        return sb.ToString();
      }
    }
  }
}
