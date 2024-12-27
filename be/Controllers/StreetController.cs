using be.Dtos;
using be.Dtos.Street;
using be.Dtos.StreetHistory;
using be.Dtos.StreetImage;
using be.Helpers;
using be.Interfaces;
using be.Mappers;
using be.Models;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace be.Controllers
{
    [ApiController]
    [Route("api/street")]
    public class StreetController : ControllerBase
    {
        private readonly IStreetRepository _streetRepo;
        private readonly IStreetTypeRepository _streetTypeRepo;
        private readonly IStreetHistoryRepository _streetHistoryRepo;
        private readonly IStreetImageRepository _streetImageRepo;

        public StreetController(IStreetRepository streetRepository, IStreetTypeRepository streetTypeRepository, IStreetHistoryRepository streetHistoryRepository, IStreetImageRepository streetImageRepository)
        {
            _streetRepo = streetRepository;
            _streetTypeRepo = streetTypeRepository;
            _streetHistoryRepo = streetHistoryRepository;
            _streetImageRepo = streetImageRepository;
        }

        [HttpGet, Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(StreetDto, int)>> GetAll([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.GetAllAsync(queryObject);
            IEnumerable<StreetDto> streetDtos = streets.Select(s => s.ToStreetDto()).ToList();
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
        }

        [HttpGet, Authorize]
        [Route("adminSearch")]
        public async Task<ActionResult<(StreetDto, int)>> SearchAdmin([FromQuery] StreetQueryObject queryObject)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            (List<Street> streets, int totalPages) = await _streetRepo.SearchAdminAsync(queryObject);
            IEnumerable<SearchStreetAdminDto> streetDtos = streets.Select(s => s.ToSearchStreetAdminDto()).ToList();
            return Ok(new { Streets = streetDtos, TotalPages = totalPages });
        }

        [HttpGet]
        [Route("userSearch")]
        public async Task<ActionResult<(StreetDto, string)>> SearchUser([FromQuery] string searchParam, [FromQuery] string? address)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            IEnumerable<Street> streets = await _streetRepo.SearchAllAsync(searchParam, address);
            IEnumerable<SearchStreetUserDto> streetDtos = streets.Select(s => s.ToSearchStreetUserDto()).ToList();
            return Ok(streetDtos);
        }

        [HttpGet("getStreetListByAddress")]
        public async Task<ActionResult<(StreetDto, string)>> GetStreetListByAddress([FromQuery] string? address)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            List<Street> streets = await _streetRepo.GetStreetListByTownAsync(address);
            List<StreetRouteDto> streetDtos = streets.Select(s => s.ToStreetRouteDto()).ToList();
            
            foreach (var streetDto in streetDtos)
            {
                streetDto.CombineRoutes();
            }
            
            return Ok(streetDtos);
        }

        [HttpGet("{id:int}"), Authorize]
        public async Task<ActionResult<(StreetDto, string)>> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }
            StreetDto streetDto = street.ToStreetDto();

            return Ok(streetDto);
        }

        [HttpGet("userGetDetail/{streetId:int}")]
        public async Task<ActionResult<(StreetDto, string)>> GetByIdUser([FromRoute] int streetId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? street = await _streetRepo.GetByIdUserAsync(streetId);
            if (street == null)
            {
                return NotFound();
            }
            StreetDto streetDto = street.ToStreetDto();

            return Ok(streetDto);
        }

        [HttpGet("exportStreetsToExcel"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<IActionResult> ExportStreetsToExcel([FromQuery] StreetQueryObject queryObject)
        {
            (List<Street> streets, int totalPages) = await _streetRepo.GetAllAsync(queryObject);

            using (var stream = new MemoryStream())
            {
                using (var spreadsheetDocument = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook))
                {
                    var workbookPart = spreadsheetDocument.AddWorkbookPart();
                    workbookPart.Workbook = new Workbook();

                    var worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                    var sheetData = new SheetData();
                    worksheetPart.Worksheet = new Worksheet(sheetData);

                    var sheets = workbookPart.Workbook.AppendChild(new Sheets());
                    var sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Streets" };
                    sheets.Append(sheet);

                    // Add headers
                    var headerRow = new Row();
                    headerRow.Append(
                        CreateCell("Tên đường"),
                        CreateCell("Địa chỉ"),
                        CreateCell("Mô tả"),
                        CreateCell("Loại đường")
                    );
                    sheetData.AppendChild(headerRow);

                    // Add data
                    foreach (var street in streets)
                    {
                        var dataRow = new Row();
                        dataRow.Append(
                            CreateCell(street.StreetName),
                            CreateCell(street.Address),
                            CreateCell(street.Description),
                            CreateCell(street.StreetType?.StreetTypeName ?? "")
                        );
                        sheetData.AppendChild(dataRow);
                    }

                    workbookPart.Workbook.Save();
                }

                stream.Seek(0, SeekOrigin.Begin);
                return File(
                    stream.ToArray(),
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "DuLieuDuong.xlsx"
                );
            }
        }

        private Cell CreateCell(string value)
        {
            return new Cell(new CellValue(value)) { DataType = CellValues.String };
        }

        private string FormatCoordinates(List<List<double>>? coordinates)
        {
            if (coordinates == null || coordinates.Count == 0)
                return "";

            return string.Join("; ", coordinates.Select(c => $"({string.Join(", ", c)})"));
        }

        [HttpPost("createStreetsFromExcel"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(List<StreetDto>, string)>> CreateStreetByExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is empty");

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                return BadRequest("File is not an Excel file");

            List<StreetDto> createdStreets = new List<StreetDto>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;

                using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Open(stream, false))
                {
                    WorkbookPart? workbookPart = spreadsheetDocument?.WorkbookPart;
                    WorksheetPart? worksheetPart = workbookPart?.WorksheetParts.FirstOrDefault();
                    SheetData? sheetData = worksheetPart?.Worksheet?.Elements<SheetData>().FirstOrDefault();

                    if (sheetData == null)
                    {
                        return BadRequest("No data found in the Excel file");
                    }

                    // Skip the header row
                    foreach (Row row in sheetData?.Elements<Row>().Skip(1) ?? Enumerable.Empty<Row>())
                    {
                        var cells = row.Elements<Cell>().ToList();
                        if (cells.Count < 4) continue;

                        string streetName = GetCellValue(workbookPart!, cells[0]);
                        string address = GetCellValue(workbookPart!, cells[1]);
                        string description = GetCellValue(workbookPart!, cells[2]);
                        string streetTypeName = GetCellValue(workbookPart!, cells[3]);

                        if (string.IsNullOrEmpty(streetName))
                        {
                            Console.WriteLine("Street name is empty");
                            continue;
                        }

                        StreetType? streetType = await _streetTypeRepo.GetByNameAsync(streetTypeName);
                        if (streetType == null) 
                        {
                            Console.WriteLine($"Street type with name {streetTypeName} not found");
                            continue;
                        }

                        Street newStreet = new Street
                        {
                            StreetName = streetName,
                            Address = address ?? "",
                            Description = description ?? "",
                            ImageUrl = "",
                            UpdatedDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Route = null,
                            WayPoints = null,
                            IsApproved = false,
                            StreetTypeId = streetType.Id
                        };

                        try
                        {
                            Street createdStreet = await _streetRepo.CreateAsync(newStreet);
                            createdStreets.Add(createdStreet.ToStreetDto());
                            Console.WriteLine($"Street created: {streetName}");
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine($"Error when creating street: {streetName}, Description: {e.Message}");
                            continue;
                        }
                    }
                }
            }

            return Ok(new { message = $"{createdStreets.Count} streets created successfully" });
        }

        private string GetCellValue(WorkbookPart workbookPart, Cell cell)
        {
            string value = cell.InnerText;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return workbookPart?.SharedStringTablePart?.SharedStringTable
                    .Elements<SharedStringItem>().ElementAt(int.Parse(value)).InnerText ?? "";
            }
            return value;
        }

        [HttpPost("create"), Authorize]
        public async Task<ActionResult<(string, StreetDto)>> Create([FromBody] CreateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (!await _streetTypeRepo.IsStreetTypeExistsAsync(streetDto.StreetTypeId))
                return BadRequest("Street type not found");
            else if (streetDto?.ManualWayPoints?.Coordinates.Count < 2 && streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });

            Street createdStreet = streetDto.ToStreetFromCreateDto();
            createdStreet.IsApproved = User.IsInRole("Admin") || User.IsInRole("SupAdmin");

            createdStreet = await _streetRepo.CreateAsync(createdStreet);

            if (streetDto != null && streetDto.Images != null)
            {
                foreach (CreateStreetImageRequestDto streetImage in streetDto.Images)
                {
                    try
                    {
                        await _streetImageRepo.CreateAsync(streetImage.ToStreetImageFromCreateDto(createdStreet.Id));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = $"Error when create image: {streetImage.ImageUrl}, Decription: ", e.Message });
                    }
                }
            }
            
            if (streetDto != null && streetDto.Histories != null)
            {
                foreach (CreateStreetHistoryRequestDto streetHistory in streetDto.Histories)
                {
                    try
                    {
                        await _streetHistoryRepo.CreateAsync(streetHistory.ToStreetHistoryFromCreateDto(createdStreet.Id));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(new { message = $"Error when create history: {streetHistory.Period}, Decription: ", e.Message });
                    }
                }
            }

            return CreatedAtAction(nameof(GetById), new { id = createdStreet.Id }, createdStreet.ToStreetDto());
        }

        /// <summary>
        /// Carefully with Route and WayPoints coordinates
        /// </summary>
        /// <remarks>
        /// Routes / WayPoints coordinates example (At least 2 points are required because it is a LineString):   
        /// {
        ///     "route": {  
        ///       "type": "LineString",  
        ///       "coordinates": [  
        ///         [  
        ///           40.712776,  
        ///           -74.005974  
        ///         ],  
        ///         [  
        ///           40.713776,  
        ///           -74.006974   
        ///         ]  
        ///       ]  
        ///     },  
        ///     "wayPoints": {  
        ///       "type": "LineString",  
        ///       "coordinates": [  
        ///         [  
        ///           40.712776,  
        ///          -74.005974  
        ///         ],  
        ///         [  
        ///           40.713776,  
        ///           -74.006974  
        ///         ],  
        ///         [  
        ///           40.714776,  
        ///           -74.007974  
        ///         ]
        ///       ]
        ///     }
        ///   }
        ///   </remarks>
        [HttpPut("{id:int}"), Authorize]
        public async Task<ActionResult<(StreetDto, string)>> Update([FromRoute] int id, [FromBody] UpdateStreetRequestDto streetDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Data don't meet requirement", ModelState });
            else if (streetDto == null)
                return BadRequest(new { message = "Street data is required" });
            else if (streetDto?.ManualWayPoints?.Coordinates.Count < 2 && streetDto?.WayPoints?.Coordinates.Count < 2)
                return BadRequest(new { message = "At least 2 points are required for Route and WayPoints" });

            Street? existingStreet = await _streetRepo.GetByIdAsync(id);
            if (existingStreet == null || streetDto == null)
            {
                return NotFound();
            }

            Street? updatedStreet = streetDto.ToStreetFromUpdateDto();
            updatedStreet.Id = id;

             // Update street histories
            List<StreetHistory> existingHistories = await _streetHistoryRepo.GetHistoriesByStreetIdAsync(id);
            List<HistoryInStreetDto> newStreetHistories = streetDto?.Histories ?? new List<HistoryInStreetDto>();

            IActionResult updateHistoriesResult = await UpdateStreetHistoriesAsync(id, newStreetHistories, existingHistories);
            if (updateHistoriesResult is BadRequestObjectResult)
            {
                return BadRequest(updateHistoriesResult);
            }

            // Update street images
            List<StreetImage> existingImages = await _streetImageRepo.GetImagesByStreetIdAsync(id);
            List<CreateStreetImageRequestDto> newStreetImages = streetDto?.Images ?? new List<CreateStreetImageRequestDto>();

            IActionResult updateImagesResult = await UpdateStreetImagesAsync(id, newStreetImages, existingImages);
            if (updateImagesResult is BadRequestObjectResult)
            {
                return BadRequest(updateImagesResult);
            }
            
            updatedStreet = await _streetRepo.UpdateAsync(updatedStreet, id);

            if (updatedStreet == null)
            {
                return NotFound();
            }  
            return Ok(updatedStreet.ToStreetDto());
        }
        private async Task<IActionResult> UpdateStreetImagesAsync(int streetId, List<CreateStreetImageRequestDto> streetImages, List<StreetImage> existingImages)
        {
            var existingImagesDict = existingImages.ToDictionary(ei => ei.PublicId);

            // Find images to delete
            List<StreetImage> streetImagesToDelete = existingImages.Where(ei => !streetImages.Any(si => si.PublicId == ei.PublicId)).ToList();

            // Find images to update
            List<StreetImage> streetImagesToUpdate = existingImages.Where(ei => streetImages.Any(si => si.PublicId == ei.PublicId && si.Description != ei.Description)).ToList();

            // Find images to create
            List<CreateStreetImageRequestDto> streetImagesToCreate = streetImages.Where(si => !existingImagesDict.ContainsKey(si.PublicId)).ToList();

            // Delete images
            foreach (StreetImage image in streetImagesToDelete)
            {
                try
                {
                    await _streetImageRepo.DeleteAsync(image.Id);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when deleting image: {image.ImageUrl}, Description: {e.Message}" });
                }
            }

            // Update images
            foreach (StreetImage image in streetImagesToUpdate)
            {
                CreateStreetImageRequestDto streetImageToUpdate = streetImages.First(si => si.PublicId == image.PublicId);
                image.Description = streetImageToUpdate.Description ?? "";
                try
                {
                    await _streetImageRepo.UpdatePublicIdAsync(image);
                }
                catch (Exception e)
                {
                    Console.WriteLine(new { message = $"Error when updating image: {image.ImageUrl}, Description: {e.Message}" });
                }
            }

            // Create new images
            foreach (CreateStreetImageRequestDto streetImageToCreate in streetImagesToCreate)
            {
                StreetImage newImage = new StreetImage
                {
                    StreetId = streetId,
                    ImageUrl = streetImageToCreate.ImageUrl,
                    PublicId = streetImageToCreate.PublicId,
                    Description = streetImageToCreate.Description ?? ""
                };
                try
                {
                    await _streetImageRepo.CreateAsync(newImage);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when creating image: {streetImageToCreate.ImageUrl}, Description: {e.Message}" });
                }
            }

            return Ok();
        }

        private async Task<IActionResult> UpdateStreetHistoriesAsync(int streetId, List<HistoryInStreetDto> newHistories, List<StreetHistory> existingHistories)
        {
            var existingHistoriesDict = existingHistories.ToDictionary(eh => eh.Id);

            // Find histories to delete
            List<StreetHistory> historiesToDelete = existingHistories
                .Where(eh => !newHistories.Any(nh => nh.Id == eh.Id))
                .ToList();

            // Find histories to update
            List<StreetHistory> historiesToUpdate = existingHistories
                .Where(eh => newHistories.Any(nh => nh.Id == eh.Id && 
                        (nh.Period != eh.Period || nh.Description != eh.Description)))
                .ToList();

            // Find histories to create
            List<CreateStreetHistoryRequestDto> historiesToCreate = newHistories
                .Where(nh => !existingHistoriesDict.ContainsKey(nh.Id))
                .Select(nh => nh.ToCreateFromHistoryInStreet())
                .ToList();

            // Delete histories
            foreach (StreetHistory history in historiesToDelete)
            {
                try
                {
                    await _streetHistoryRepo.DeleteAsync(history.Id);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when deleting history: {history.Period}, Description: {e.Message}" });
                }
            }

            // Update histories
            foreach (StreetHistory history in historiesToUpdate)
            {
                HistoryInStreetDto historyToUpdate = newHistories.First(nh => nh.Id == history.Id);
                history.Period = historyToUpdate.Period;
                history.Description = historyToUpdate.Description ?? "";
                try
                {
                    await _streetHistoryRepo.UpdateAsync(history, history.Id);
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when updating history: {history.Period}, Description: {e.Message}" });
                }
            }

            // Create new histories
            foreach (CreateStreetHistoryRequestDto historyToCreate in historiesToCreate)
            {
                try
                {
                    await _streetHistoryRepo.CreateAsync(historyToCreate.ToStreetHistoryFromCreateDto(streetId));
                }
                catch (Exception e)
                {
                    return BadRequest(new { message = $"Error when creating history: {historyToCreate.Period}, Description: {e.Message}" });
                }
            }

            return Ok();
        }

        [HttpDelete("{id:int}"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, Street)>> Delete(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Street? deletedStreet = await _streetRepo.DeleteAsync(id);

            if (deletedStreet == null)
            {
                return NotFound();
            }

            return Ok(new { message = "Street deleted successfully", deletedStreet });
        }

        [HttpPost("{id:int}/approveStreet"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, StreetDto)>> ApproveStreet(int id)
        {
            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            street.IsApproved = true;
            await _streetRepo.UpdateAsync(street, id);

            return Ok(new { message = "Street approved successfully", street = street.ToStreetDto() });
        }

        [HttpPost("{id:int}/rejectStreet"), Authorize(Roles = "Admin,SupAdmin")]
        public async Task<ActionResult<(string, StreetDto)>> RejectStreet(int id)
        {
            Street? street = await _streetRepo.GetByIdAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            street.IsApproved = false;
            await _streetRepo.UpdateAsync(street, id);

            return Ok(new { message = "Street rejected successfully", street = street.ToStreetDto() });
        }
    }
}