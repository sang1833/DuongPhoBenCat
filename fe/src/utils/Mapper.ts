import { IStreetRoute, StreetInfo } from "../types";

export const StreetInfoToIStreetRoute = (street: StreetInfo): IStreetRoute => {
  return {
    id: street.id,
    streetName: street.streetName,
    address: street.address,
    route: street.route
  };
};
