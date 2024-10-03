using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Helpers
{
    public static class EnvManager
    {
        public static string GetEnv(string key)
        {
            return Environment.GetEnvironmentVariable(key) ?? throw new ArgumentNullException($"Environment variable {key} not found.");
        }
    }
}