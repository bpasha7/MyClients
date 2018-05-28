using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Data.DTO.Entities;
using Data.EF.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyClientsBase.Helpers;
using MyClientsBase.Services;
using Microsoft.AspNetCore.Cors;
using System.Threading.Tasks;
using System.IO;

namespace MyClientsBase.Controllers
{
  public partial class UsersController : Controller
  {
    [HttpPost("product")]
    public IActionResult CreateProduct([FromBody]ProductDto productDto)
    {
      try
      {
        var product = _mapper.Map<Product>(productDto);

        if (product == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
        product.UserId = userId;

        _userService.CreateProduct(product);

        _logger.LogInformation($"User #{userId}, CreateProduct #{product.Id}");

        var res =_userService.IncomeBonus(userId, _appSettings.BonusTypes.NewPrice, _appSettings.Bonuses.NewPrice, _appSettings.BonusLimitPerDay.NewPrice);

        if(res)
          _logger.LogInformation($"User #{userId}, {_appSettings.Bonuses.NewPrice} bonus incomes");

        return Ok(new
        {
          Message = "Услуга добавлена!",
          PorductId = product.Id
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpPost, DisableRequestSizeLimit, Route("product/{id}/photo")]
    public async Task<IActionResult> UploadFile(int id)
    {
      try
      {
        var file = Request.Form.Files.FirstOrDefault();
        if (file == null)
          throw new AppException("Empty file!");
        if (file.Length > _appSettings.MaxImageSize * 1024)
          throw new AppException("Слишком большое изображени");
        //combine path to user folder using md5 hash
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, UploadProductPhoto #{id}");


        var userName = User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        var hash = AppFileSystem.GetUserMD5(userId, User.Identity.Name);
        //create directory in not exist
        var path = $"{Directory.GetCurrentDirectory()}{_appSettings.PhotoFolder}{hash}";
        if (!Directory.Exists(path))
          Directory.CreateDirectory(path);
        path += $"\\{id}_p";

        if (System.IO.File.Exists(path + ".jpg"))
          System.IO.File.Delete(path + ".jpg");
        using (FileStream fstream = new FileStream(path + ".new", FileMode.Create))
        {
          await file.CopyToAsync(fstream);
        }
        if (!AppFileSystem.CompressImage(path, _appSettings.PhotoProductSize))
        {
          _logger.LogError($"File {path} was not compressed and deleted!");
          throw new AppException("Ошибка загрузки файла.");
        }
        _userService.SetPhotoFlag(userId, id);
        return Ok(new
        {

        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpGet("products")]
    public IActionResult GetProducts()
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, GetProducts");

        var products = _userService.GetProducts(userId);
        return Ok(new
        {
          Products = _mapper.Map<ProductDto[]>(products)
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpPatch("product/{id}")]
    public IActionResult RemoveProduct(int id)
    {
      try
      {
        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, RemoverProduct #{id}");

        _userService.SetAsRemovedProduct(userId, id);
        return Ok(new
        {
          Message = "Услуга удалена"
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }

    [HttpPut("product")]
    public IActionResult UpdateProducts([FromBody]ProductDto productDto)
    {
      try
      {
        var product = _mapper.Map<Product>(productDto);

        if (product == null)
          throw new AppException("Неверный данные!");

        var userId = Convert.ToInt32(User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

        _logger.LogInformation($"User #{userId}, UpdateProduct #{product.Id}");


        if (product.UserId != userId)
          throw new AppException("Вам нельзя обновить услугу!");

        var count = _orderService.OrdersDone(product.Id);

        //if (count != 0)
        //  throw new AppException($"Есть записи({count} шт.), нельзя обновить!");

        _userService.UpdateProduct(product, count);

        return Ok(new
        {
          Message = "Услуга обновлена!"
        });
      }
      catch (AppException ex)
      {
        return BadRequest(ex.Message);
      }
      catch (Exception ex)
      {
        _logger.LogCritical($"{ex}");
        return BadRequest("Service error!");
      }
    }
  }
}
