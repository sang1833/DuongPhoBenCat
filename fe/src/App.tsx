import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import StreetSearch from "./components/Header/StreetSearch";
import { StreetInfo as StreetInfoType, MapState, IStreetRoute } from "./types";
import { getStreetRoutes } from "./apis/function";
import { useNavigate } from "react-router-dom";
import { StreetInfoToIStreetRoute } from "./utils/Mapper";
import AppLogo from "/logo.png";
import Footer from "./components/Footer/Footer";

function App() {
  const navigate = useNavigate();
  // Current street ROUTE show on map
  const [selectedStreet, setSelectedStreet] = useState<IStreetRoute | null>(
    null
  );
  // List street ROUTE on map
  const [filteredStreets, setFilteredStreets] = useState<IStreetRoute[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTown, setSelectedTown] = useState<string>("Tất cả");
  const [mapState, setMapState] = useState<MapState>({
    center: [11.1605595, 106.584514],
    zoom: 13
  });

  const handleSelectStreet = (street: IStreetRoute | null) => {
    const streetRoute = StreetInfoToIStreetRoute(street as StreetInfoType);
    setSelectedStreet(streetRoute);
    if (street) {
      setMapState({
        center: street.route.coordinates[0],
        zoom: 15
      });
    }
  };

  const handleClearStreet = () => {
    setSelectedStreet(null);
    setFilteredStreets([]);
  };

  useEffect(() => {
    if (selectedTown) {
      getStreetRoutes(selectedTown == "Tất cả" ? "" : selectedTown).then(
        (data) => {
          setFilteredStreets(data as unknown as IStreetRoute[]);
        }
      );
    } else {
      setFilteredStreets([]);
    }
  }, [selectedTown]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-[#145da0] text-white p-3">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold flex items-center">
            <img src={AppLogo} alt="Logo" className="w-8 h-8 mr-2" />
            <span className="hidden sm:inline">Bản đồ Bến Cát</span>
          </h1>
          <StreetSearch
            onSelectStreet={handleSelectStreet}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            townFilter={selectedTown}
            setTownFilter={setSelectedTown}
          />
        </div>
      </header>
      {/* Main */}
      <main className="flex-grow flex flex-col sm:flex-row overflow-hidden relative">
        <div className="w-full sm:w-1/4 h-1/2 sm:h-full overflow-y-auto">
          {/* <StreetDetail
            selectedStreet={selectedStreet}
            filteredStreets={filteredStreets}
            handleSelectStreet={handleSelectStreet}
            selectedTown={selectedTown}
          /> */}
        </div>
        <div className="w-full sm:w-3/4 h-1/2 sm:h-full">
          <Map
            streets={filteredStreets as unknown as IStreetRoute[]}
            selectedStreet={selectedStreet}
            mapState={mapState}
            onStreetClick={handleSelectStreet}
          />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
