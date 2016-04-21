using HealthCare.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace HealthCare.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        public int Get()
        {
            return 10;
        }

        [Route("GetData")]
       
        [HttpPost]

        public HttpResponseMessage GetData(HospitalRegister input)
        {
            try
            {
                return Request.CreateResponse(HttpStatusCode.OK, input);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
    }
}
