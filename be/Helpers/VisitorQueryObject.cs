using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Helpers
{
    public class VisitorQueryObject
    {
        public enum TimeOptions
        {
            Today,
            Yesterday,
            LastWeek,
            LastMonth,
            LastYear,
            AllTime
        }
    }
}