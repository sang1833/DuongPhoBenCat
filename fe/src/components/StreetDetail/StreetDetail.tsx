import { IStreetRoute, StreetInfo } from "../../types";

interface StreetDetailProps {
  filteredStreets: IStreetRoute[];
  handleSelectStreet: (street: StreetInfo) => void;
}

const StreetDetail: React.FC<StreetDetailProps> = ({
  filteredStreets,
  handleSelectStreet
}) => {
  return (
    <>
      {filteredStreets.length > 0 && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Streets in {selectedTown}</h2>
          <ul>
            {filteredStreets.map((street) => (
              <li
                key={street.id}
                className="mb-2 cursor-pointer hover:text-blue-600"
                onClick={() => handleSelectStreet(street)}
              >
                {street.streetName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default StreetDetail;
