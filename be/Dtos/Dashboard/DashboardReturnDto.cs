using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;

namespace be.Dtos.Dashboard
{
    public class DashboardReturnDto
    {
        public TotalUserAccessCount? TotalUserAccess { get; set; }
        public TotalUserToday? TotalUserToday { get; set; }
        public TotalStreetCount? TotalStreetCount { get; set; }
        public TotalEmployeeCount? TotalEmployeeCount { get; set; }
        public AddressChart? AddressChart { get; set; }
    }

    public class TotalUserAccessCount {
        public int Total { get; set; }
    }

    public class TotalUserToday {
        public int Total { get; set; }
        public double ChangeValue { get; set; }
    }

    public class TotalStreetCount {
        public int Total { get; set; }
        public double ChangeValue { get; set; }
    }

    public class TotalEmployeeCount {
        public int Total { get; set; }
    }
}