import { MapComponent, SearchBar } from "@components";
import LinkInterceptor from "./common/LinkInterceptor";
import "./css/App.css";

function App() {
  return (
    <>
      <LinkInterceptor>
        <SearchBar />
        <MapComponent />
      </LinkInterceptor>
    </>
  );
}

export default App;
