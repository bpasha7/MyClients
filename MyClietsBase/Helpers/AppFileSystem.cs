using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreeImageAPI;
using Microsoft.AspNetCore.Http;

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
    /// <summary>
    /// Save file async to users dir
    /// </summary>
    /// <param name="path">User directory</param>
    /// <param name="fileName">File name to save</param>
    /// <param name="file">File</param>
    /// <returns>Saving result</returns>
    public static async Task<bool> SaveFileAsync(string path, string fileName, IFormFile file)
    {
      try
      {
        //create directory in not exist
        if (!Directory.Exists(path))
          Directory.CreateDirectory(path);
        path += $"\\{fileName}";
        //delete existing file
        if (System.IO.File.Exists(path + ".jpg"))
          System.IO.File.Delete(path + ".jpg");
        using (FileStream fstream = new FileStream(path + ".new", FileMode.Create))
        {
          await file.CopyToAsync(fstream);
        }
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }
    /// <summary>
    /// Compressing Image
    /// </summary>
    /// <param name="imagePath">Path to image</param>
    /// <param name="size">Size to compress</param>
    /// <returns>Compressing result</returns>
    public static bool CompressImage(string imagePath, int size)
    {
      try
      {
        //string newFile = imagePath.Replace(".jpg", ".new");
        using (var original = FreeImageBitmap.FromFile(imagePath + ".new"))
        {

          int width, height;
          if (original.Width > original.Height)
          {
            width = size;
            height = original.Height * size / original.Width;
          }
          else
          {
            width = original.Width * size / original.Height;
            height = size;
          }
          var resized = new FreeImageBitmap(original, width, height);
          // JPEG_QUALITYGOOD is 75 JPEG.
          // JPEG_BASELINE strips metadata (EXIF, etc.)
          resized.Save(imagePath + ".jpg", FREE_IMAGE_FORMAT.FIF_JPEG,
              FREE_IMAGE_SAVE_FLAGS.JPEG_QUALITYGOOD |
              FREE_IMAGE_SAVE_FLAGS.JPEG_BASELINE);
        }
        System.IO.File.Delete(imagePath + ".new");
        return true;
      }
      catch(Exception ex)
      {
        return false;
      }
    }
  }
}
