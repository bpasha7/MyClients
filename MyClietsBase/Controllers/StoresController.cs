using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MyClientsBase.Helpers;
using MyClientsBase.Services;

namespace MyClientsBase.Controllers
{
  [AllowAnonymous]
  [Produces("application/json")]
  [Route("api/Stores")]
  public class StoresController : Controller
  {
    /// <summary>
    /// Store Servise to work with database
    /// </summary>
    private IStoreService _storeService;
    /// <summary>
    /// Mapper
    /// </summary>
    private IMapper _mapper;
    /// <summary>
    /// Application settings. appSettrings.json
    /// </summary>
    private readonly AppSettings _appSettings;
    /// <summary>
    /// Logger
    /// </summary>
    private ILogger _logger;
    // GET: api/Stores/storeName
    [HttpGet("{id}", Name = "Get")]
    public string Get(string storeName)
    {

      return "value";
    }

    //// GET: api/Stores
    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}



    //// POST: api/Stores
    //[HttpPost]
    //public void Post([FromBody]string value)
    //{
    //}

    //// PUT: api/Stores/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody]string value)
    //{
    //}

    //// DELETE: api/ApiWithActions/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
  }
}
