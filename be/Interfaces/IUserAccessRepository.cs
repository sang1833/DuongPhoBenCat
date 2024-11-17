using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Dtos.TrackRequest;
using be.Helpers;
using be.Models;
using DocumentFormat.OpenXml.Office2019.Presentation;

namespace be.Interfaces
{
    public interface IUserAccessRepository
    {
        Task<bool> TrackAccessAsync(TrackRequest request);
        Task<int> GetAccessCountAsync();
        Task<(List<TrackRequest>, int)> GetAccessRequestsAsync(TrackRequestQueryObject query);
    }
}