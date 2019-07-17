using System;
using System.Collections.Generic;
using System.Text;

namespace Kalathingal.Configuration
{
    public class ResultData
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public object[] Arguments { get; set; }
    }

    public class ResultData<TData> : ResultData
    {
        public TData Data { get; set; }
    }

    public class ResultData<TData, TStat> : ResultData<TData>
    {
        public TStat ErrorCode { get; set; }
    }
}
