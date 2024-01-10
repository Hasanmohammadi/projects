"use client";
import { createContext, useState, useMemo, useContext } from "react";
import DateObject from "react-date-object";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import {
  FlightClassI,
  FlightInfoContextI,
  FlightTypeI,
  PassengersI,
  PlaceI,
  WayTypeI,
} from "@/types/flight";

const persianTodayDate = new DateObject()
  .convert(persian, gregorian_en)
  .format();

const FlightInfoContext = createContext<FlightInfoContextI>({
  departurePlace: { id: "", label: "", isCity: false },
  setDeparturePlace: (departurePlace: PlaceI) => {},
  arrivalPlace: { id: "", label: "", isCity: false },
  setArrivalPlace: (arrivalPlace: PlaceI) => {},
  returnDate: persianTodayDate,
  setReturnDate: (arrivalPlace: string) => {},
  departureDate: persianTodayDate,
  setDepartureDate: (departureDate: string) => {},
  flightType: "domestic",
  setFlightType: (flightType: FlightTypeI) => {},
  wayType: "One Way",
  setWayType: (wayType: WayTypeI) => {},
  flightClass: "economy",
  setFlightClass: (flightClass: FlightClassI) => {},
  passengers: { adults: 1, children: 0, infants: 0 },
  setPassengers: (passengers: PassengersI) => {},
  invoiceCode: "",
  setInvoiceCode: (invoiceCode: string) => {},
});

export default function FlightInfoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [departurePlace, setDeparturePlace] = useState<PlaceI>({
    id: "",
    label: "",
    isCity: false,
  });

  const [arrivalPlace, setArrivalPlace] = useState<PlaceI>({
    id: "",
    label: "",
    isCity: false,
  });

  const [returnDate, setReturnDate] = useState(persianTodayDate);
  const [departureDate, setDepartureDate] = useState(persianTodayDate);

  const [flightType, setFlightType] = useState<FlightTypeI>("domestic");
  const [wayType, setWayType] = useState<WayTypeI>("One Way");
  const [flightClass, setFlightClass] = useState<FlightClassI>("economy");
  const [invoiceCode, setInvoiceCode] = useState<string>("");
  const [passengers, setPassengers] = useState<PassengersI>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const value: FlightInfoContextI = useMemo(
    () => ({
      departurePlace,
      setDeparturePlace,
      arrivalPlace,
      setArrivalPlace,
      returnDate,
      setReturnDate,
      departureDate,
      setDepartureDate,
      flightType,
      setFlightType,
      wayType,
      setWayType,
      flightClass,
      setFlightClass,
      passengers,
      setPassengers,
      invoiceCode,
      setInvoiceCode,
    }),
    [
      departurePlace,
      arrivalPlace,
      returnDate,
      departureDate,
      flightType,
      wayType,
      flightClass,
      passengers,
      invoiceCode,
    ]
  );

  return (
    <FlightInfoContext.Provider value={value}>
      {children}
    </FlightInfoContext.Provider>
  );
}

export const useFlightInfoContext = () => useContext(FlightInfoContext);
