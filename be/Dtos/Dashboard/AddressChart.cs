using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Dtos.Dashboard
{
    public class AddressChart
    {
        public List<AddressPercentage> AddressPercentages { get; set; } = new List<AddressPercentage>();
        public void AddAddressPercentage(string? address, int? percentage)
        {
            AddressPercentages.Add(new AddressPercentage
            {
                Address = address,
                Percentage = percentage
            });
        }
    }

    public class AddressPercentage
    {
        public string? Address { get; set; }
        public int? Percentage { get; set; }
    }
}