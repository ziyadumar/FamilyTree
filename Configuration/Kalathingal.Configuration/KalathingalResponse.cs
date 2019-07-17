using Microsoft.Extensions.Localization;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kalathingal.Configuration
{
    public class KalathingalResponse<T>
    {

        public string StatusCode { get; set; }

        //public string LocalizedMessage { get; set; }

        public T Data { get; set; }

        public string Message { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public int? TotalCount { get; set; }




        public static KalathingalResponse<T> SetResponse(string statusCode, /*IStringLocalizer localizer,*/ T data, string message = null,
            params object[] arguments)
        {
            //var localizedString = (arguments != null && arguments.Length > 0) ?
            //    localizer[statusCode, arguments] : localizer[statusCode];

            KalathingalResponse<T> response = new KalathingalResponse<T>()
            {
                StatusCode = statusCode,
                Data = data,
                //LocalizedMessage = (localizedString.ResourceNotFound)
                //? "Localization message not found. Please report this error code: " + statusCode
                //: localizedString.Value,
                Message = message
            };
            return response;
        }


        public static KalathingalResponse<T> SetResponse(string statusCode,/* string localizedMessage,*/ T data, string message = null)
        {
            KalathingalResponse<T> response = new KalathingalResponse<T>()
            {
                StatusCode = statusCode,
                Data = data,
                //LocalizedMessage = localizedMessage,
                Message = message
            };
            return response;
        }


    }


    public class ListResponse<T>
    {
        public T Data { get; set; }
        public int TotalCount { get; set; }
    }

}
