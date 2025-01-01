using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Dashboard
{
    public class AccessChartDto
    {
        public List<AccessData> Data { get; set; } = new List<AccessData>();
        public class AccessData
        {
            public string Time { get; set; } = "";
            public int Count { get; set; }
        }
    }
}