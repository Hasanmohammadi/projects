"use client";
import { FlightGeneralInfoI, FlightSearchResultContextI } from "@/types/flight";
import {
  FrontDataFlightsI,
  FrontDataSearchResultI,
  OpratorDetailI,
} from "@/types/search";
import { createContext, useContext, useMemo, useState } from "react";

const searchResultDefaultValue: FrontDataSearchResultI = {
  flightGroups: [],
  searchID: "",
  searchType: "",
  total: 0,
  travelerAvailAdultCount: 1,
  travelerAvailChildCount: 0,
  travelerAvailInfantCount: 0,
  maxTotalFareAmount: 0,
  minTotalFareAmount: 0,
  totalRemaining: 0,
};

const flightInfoDefaultValue: FrontDataFlightsI = {
  id: "",
  flightId: "",
  provider: {
    code: "",
    title: "",
    displayName: "",
  },
  connectionId: 0,
  canBook: false,
  canReserve: false,
  cabinClass: "",
  stops: 0,
  totalFlightDuration: 0,
  totalFareAmount: 0,
  departureDate: "",
  legs: [],
};

const flightGeneralInfoDefaultValue: FlightGeneralInfoI = {
  groupFares: [],
  groupId: "",
  id: "",
  oneAdultTotalFare: 0,
  totalFareAmount: 0,
  currencyCode: "",
  passengersCount: {
    adult: 0,
    child: 0,
    infant: 0,
  },
};

const FlightSearchResultContext = createContext<FlightSearchResultContextI>({
  searchResult: searchResultDefaultValue,
  setSearchResult: (searchResult: FrontDataSearchResultI) => {},
  searchResultLoading: false,
  setSearchResultLoading: (searchResultLoading: boolean) => {},
  opratorDetails: [],
  setOpratorDetails: (opratorDetails: OpratorDetailI[]) => {},
  airLineSelected: [],
  setAirLineSelected: (airLineSelected: string[]) => {},
  departureFlightInfo: flightInfoDefaultValue,
  setDepartureFlightInfo: (departureFlightInfo: FrontDataFlightsI) => {},
  returnFlightInfo: flightInfoDefaultValue,
  setReturnFlightInfo: (returnFlightInfo: FrontDataFlightsI) => {},
  flightGeneralInfo: flightGeneralInfoDefaultValue,
  setFlightGeneralInfo: (returnFlightInfo: FlightGeneralInfoI) => {},
  departureStops: [],
  setDepartureStops: (departureStops: number[]) => {},
  arrivalStops: [],
  setArrivalStops: (arrivalStops: number[]) => {},
  filter: {
    name: "OneAdultTotalFare",
    orderByDesc: false,
  },
  setFilter: (filter: { name: string; orderByDesc: boolean }) => {},
  priceFilter: [],
  setPriceFilter: (arrivalStops: number[]) => {},
  isSystemFlight: null,
  setIsSystemFlight: (isSystemFlight: null | boolean) => {},
});

export default function FlightSearchResultContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchResult, setSearchResult] = useState<FrontDataSearchResultI>(
    searchResultDefaultValue
  );

  const [opratorDetails, setOpratorDetails] = useState<OpratorDetailI[]>([]);
  const [priceFilter, setPriceFilter] = useState<number[]>([]);

  const [searchResultLoading, setSearchResultLoading] =
    useState<boolean>(false);
  const [airLineSelected, setAirLineSelected] = useState<string[]>([]);
  const [departureStops, setDepartureStops] = useState<number[]>([]);
  const [arrivalStops, setArrivalStops] = useState<number[]>([]);
  const [filter, setFilter] = useState<{
    name: string;
    orderByDesc: boolean;
  }>({ name: "OneAdultTotalFare", orderByDesc: false });
  const [departureFlightInfo, setDepartureFlightInfo] =
    useState<FrontDataFlightsI>(flightInfoDefaultValue);
  const [returnFlightInfo, setReturnFlightInfo] = useState<FrontDataFlightsI>(
    flightInfoDefaultValue
  );
  const [flightGeneralInfo, setFlightGeneralInfo] =
    useState<FlightGeneralInfoI>(flightGeneralInfoDefaultValue);

  const [isSystemFlight, setIsSystemFlight] = useState<null | boolean>(null);

  const value: FlightSearchResultContextI = useMemo(
    () => ({
      searchResult,
      setSearchResult,
      searchResultLoading,
      setSearchResultLoading,
      opratorDetails,
      setOpratorDetails,
      airLineSelected,
      setAirLineSelected,
      departureFlightInfo,
      setDepartureFlightInfo,
      returnFlightInfo,
      setReturnFlightInfo,
      flightGeneralInfo,
      setFlightGeneralInfo,
      departureStops,
      setDepartureStops,
      arrivalStops,
      setArrivalStops,
      filter,
      setFilter,
      priceFilter,
      setPriceFilter,
      isSystemFlight,
      setIsSystemFlight,
    }),
    [
      searchResult,
      searchResultLoading,
      opratorDetails,
      airLineSelected,
      departureFlightInfo,
      returnFlightInfo,
      flightGeneralInfo,
      departureStops,
      arrivalStops,
      filter,
      priceFilter,
      isSystemFlight,
    ]
  );

  return (
    <FlightSearchResultContext.Provider value={value}>
      {children}
    </FlightSearchResultContext.Provider>
  );
}

export const useFlightSearchResultContext = () =>
  useContext(FlightSearchResultContext);
