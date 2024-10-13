import { useState } from "react";
import Map from "./components/Map/Map";
import StreetSearch from "./components/StreetSearch";
import StreetInfo from "./components/StreetInfo";
import { streets } from "./data/streets";
import { StreetInfo as StreetInfoType, MapState } from "./types";
import { MapPin } from "lucide-react";

function App() {
  const [selectedStreet, setSelectedStreet] = useState<StreetInfoType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTown, setSelectedTown] = useState<string>("All");
  const [mapState, setMapState] = useState<MapState>({
    center: [11.1616595, 106.594514],
    zoom: 13
  });

  const handleSelectStreet = (street: StreetInfoType | null) => {
    setSelectedStreet(street);
    if (street) {
      setMapState({
        center: street.route[0],
        zoom: 15
      });
    }
  };

  const filteredStreets =
    selectedTown !== "All"
      ? streets.filter((street) => street.address.includes(selectedTown))
      : streets;

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold flex items-center">
            <MapPin className="mr-2" />
            <span className="hidden sm:inline">Street Explorer</span>
          </h1>
          <StreetSearch
            streets={streets}
            onSelectStreet={handleSelectStreet}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            townFilter={selectedTown}
            setTownFilter={setSelectedTown}
          />
        </div>
      </header>
      <main className="flex-grow flex flex-col sm:flex-row overflow-hidden relative">
        <div className="w-full sm:w-1/3 h-1/2 sm:h-full overflow-y-auto">
          {selectedStreet ? (
            <StreetInfo street={selectedStreet} />
          ) : (
            filteredStreets.length > 0 && (
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">
                  Streets in {selectedTown}
                </h2>
                <ul>
                  {filteredStreets.map((street) => (
                    <li
                      key={street.id}
                      className="mb-2 cursor-pointer hover:text-blue-600"
                      onClick={() => handleSelectStreet(street)}
                    >
                      {street.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
        <div className="w-full sm:w-2/3 h-1/2 sm:h-full">
          <Map
            streets={filteredStreets}
            selectedStreet={selectedStreet}
            mapState={mapState}
            onStreetClick={handleSelectStreet}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
