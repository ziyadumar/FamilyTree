using System;
using System.Collections.Generic;
using System.Text;

namespace Kalathingal.Configuration
{
    public class KalathingalConfiguration
    {
        public string PgSqlConnectionString { get; set; }
        public string TokenIssuer { get; set; }
        public string JwtTokenAudience { get; set; }
        public string JwtSecretToken { get; set; }
        public string APIKey { get; set; }
        public string HangfireServerConnectionString { get; set; }
        public bool HangfireDashboardAuth { get; set; }
        public string SMSGatewayAuthIN { get; set; }
        public string BaseUrl { get; set; }
        public bool APIKeyEnabled { get; set; }
        public string RazorPayKey { get; set; }
        public string RazorPaySecret { get; set; }
    }
}
