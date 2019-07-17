using Microsoft.Extensions.Options;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Kalathingal.Configuration
{
    public class ConnectionManager
    {
        private IOptions<KalathingalConfiguration> _options;

        public ConnectionManager(IOptions<KalathingalConfiguration> options)
        {
            string connectionString = options.Value.PgSqlConnectionString;
            _options = options;
        }

        public IDbConnection GetNew()
        {
            string connectionString = _options.Value.PgSqlConnectionString;
            var connection = new NpgsqlConnection(connectionString);
            return connection;
        }
    }
}
