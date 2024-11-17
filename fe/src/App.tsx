import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Map from "./components/Map/Map";
import StreetSearch from "./components/Header/StreetSearch";
import { IStreetRoute } from "./types";
import { getStreetRoutes } from "./apis/function";
import AppLogo from "/logo.png";
import Footer from "./components/Footer/Footer";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { StreetInfoToIStreetRoute } from "./utils/Mapper";
import { addMapState } from "./redux/mapSlice";
import { removeCurrentStreet } from "./redux/StreetSlice";
import { getIpInfor } from "./apis/ipInfor";

function App() {
  const isIpInfoFetched = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { currentStreetId } = useParams();
  const { currentStreet } = useSelector((state: RootState) => state.street);
  // Current street ROUTE show on map
  const [selectedStreet, setSelectedStreet] = useState<IStreetRoute | null>(
    null
  );
  // List street ROUTE on map
  const [filteredStreets, setFilteredStreets] = useState<IStreetRoute[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTown, setSelectedTown] = useState<string>("Tất cả");

  // const handleSelectStreetOnMap = (street: IStreetRoute | null) => {
  //   const streetRoute = StreetInfoToIStreetRoute(street as StreetInfoType);
  //   setSelectedStreet(streetRoute);
  //   navigate(`/street/${street?.id}`);
  //   if (street) {
  //     setMapState({
  //       center: street.route.coordinates[0],
  //       zoom: 15
  //     });
  //   }
  // };

  useEffect(() => {
    if (!isIpInfoFetched.current) {
      getIpInfor();
      isIpInfoFetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (currentStreet !== null) {
      const streetRoute = StreetInfoToIStreetRoute(currentStreet);
      setSelectedStreet(streetRoute);
      // setFilteredStreets([streetRoute]);

      dispatch(
        addMapState({ center: streetRoute.route.coordinates[0], zoom: 16 })
      );
    }
  }, [currentStreet, dispatch]);

  const handleSelectStreet = (streetId: number | null) => {
    if (streetId === null) {
      setSelectedStreet(null);
      dispatch(removeCurrentStreet());
      return;
    }
    navigate(`/street/${streetId}`);
  };

  // const handleClearStreet = () => {
  //   setSelectedStreet(null);
  //   setFilteredStreets([]);
  // };

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
        <Outlet />
        <div className="w-full h-full">
          <Map
            streets={filteredStreets as unknown as IStreetRoute[]}
            selectedStreet={selectedStreet}
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
