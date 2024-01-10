import { FlightClassI, FlightTypeI, PassengersI, PlaceI, WayTypeI } from ".";
import { PlacesI } from "../basicInformation";
import {
  FrontDataFlightsI,
  FrontDataSearchResultI,
  OpratorDetailI,
} from "../search";
import { FlightGeneralInfoI } from "./flight";

export interface FlightInfoContextI {
  departurePlace: PlaceI;
  setDeparturePlace: (departurePlace: PlaceI) => void;
  arrivalPlace: PlaceI;
  setArrivalPlace: (arrivalPlace: PlaceI) => void;
  returnDate: string;
  setReturnDate: (returnDate: string) => void;
  departureDate: string;
  setDepartureDate: (departure: string) => void;
  flightType: FlightTypeI;
  setFlightType: (flightType: FlightTypeI) => void;
  wayType: WayTypeI;
  setWayType: (wayType: WayTypeI) => void;
  flightClass: FlightClassI;
  setFlightClass: (flightClass: FlightClassI) => void;
  passengers: PassengersI;
  setPassengers: (passengers: PassengersI) => void;
  invoiceCode: string;
  setInvoiceCode: (invoiceCode: string) => void;
}

export interface FlightSearchResultContextI {
  searchResult: FrontDataSearchResultI;
  setSearchResult: (searchResult: FrontDataSearchResultI) => void;
  searchResultLoading: boolean;
  setSearchResultLoading: (searchResultLoading: boolean) => void;
  opratorDetails: OpratorDetailI[];
  setOpratorDetails: (passengers: OpratorDetailI[]) => void;
  airLineSelected: string[];
  setAirLineSelected: (airLineSelected: string[]) => void;
  departureFlightInfo: FrontDataFlightsI;
  setDepartureFlightInfo: (departureFlightInfo: FrontDataFlightsI) => void;
  returnFlightInfo: FrontDataFlightsI;
  setReturnFlightInfo: (returnFlightInfo: FrontDataFlightsI) => void;
  flightGeneralInfo: FlightGeneralInfoI;
  setFlightGeneralInfo: (flightInfoGeneralInfo: FlightGeneralInfoI) => void;
  departureStops: number[];
  setDepartureStops: (departureStops: number[]) => void;
  arrivalStops: number[];
  setArrivalStops: (arrivalStops: number[]) => void;
  filter: { name: string; orderByDesc: boolean };
  setFilter: (filter: { name: string; orderByDesc: boolean }) => void;
  priceFilter: number[];
  setPriceFilter: (priceFilter: number[]) => void;
  isSystemFlight: boolean | null;
  setIsSystemFlight: (priceFilter: boolean | null) => void;
}
