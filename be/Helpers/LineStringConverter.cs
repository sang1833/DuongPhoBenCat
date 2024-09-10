using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NetTopologySuite.Geometries;

namespace be.Helpers
{
    public class LineStringConverter : JsonConverter<LineString>
    {
        public override LineString ReadJson(JsonReader reader, Type objectType, LineString? existingValue, bool hasExistingValue, JsonSerializer serializer)
        {
            var jsonObject = JObject.Load(reader);
            var coordinates = jsonObject["coordinates"]?.ToObject<double[][]>();

            if (coordinates == null)
            {
                throw new JsonSerializationException("Coordinates cannot be null");
            }

            var points = Array.ConvertAll(coordinates, coord => new Coordinate(coord[0], coord[1]));
            return new LineString(points);
        }

        public override void WriteJson(JsonWriter writer, LineString? value, JsonSerializer serializer)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value), "LineString value cannot be null");
            }

            writer.WriteStartObject();
            writer.WritePropertyName("type");
            writer.WriteValue("LineString");
            writer.WritePropertyName("coordinates");
            writer.WriteStartArray();
            foreach (var coord in value.Coordinates)
            {
                writer.WriteStartArray();
                writer.WriteValue(coord.X);
                writer.WriteValue(coord.Y);
                writer.WriteEndArray();
            }
            writer.WriteEndArray();
            writer.WriteEndObject();
        }
    }

}