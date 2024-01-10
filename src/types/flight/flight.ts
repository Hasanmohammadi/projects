import { GroupFareI } from "../search";

export interface SearchBoxFormI {
  departure: PlaceI;
  arrival: PlaceI;
  departureDate: string;
  returnDate: string;
  flightClass: FlightClassI;
  wayType: "Round-trip" | "One Way";
  adults: number;
  children: number;
  infants: number;
  flightType: "international" | "domestic";
}

export interface SeparateDateI {
  day: number;
  year: number;
  month: { number: number };
}

export interface PlaceI {
  id: string;
  label: string;
  isCity: boolean;
}
export interface PassengersI {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightInfoI {
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  returnDate: string;
  arrivalCity: string;
  durationTime: number;
  departureAirport: string;
  departureCity: string;
  arrivalAirport: string;
  airlineLogo: string;
  flightId: string;
  marketerName: string;
  flightNumberDisplay: string;
  cabinClass: string;
  legs: FrontDataLegI[];
}

export interface FrontDataLegI {
  flightNumberDisplay: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  flightDurationMinutes: number;
  baggageItems: BaggageItemI[];
  airLineLogoUrl: string;
  arrivalTimeTimeOnly: string;
  departureTimeTimeOnly: string;
  arrivalTimeDateOnly: string;
  departureTimeDateOnly: string;
  flightDurationText: string;
  layoverDurationText: string;
  departureAirportName: string;
  arrivalAirportName: string;
  departureCityName: string;
  departureCountryName: string;
  arrivalCityName: string;
  arrivalCountryName: string;
  opratorName: string;
  marketerName: string;
  stopTimeToNextLegMinute: number;
  stopTimeToNextLegText: string;
}

export interface BaggageItemI {
  baggageDetailID: number;
  passengerType: string;
  amount: number;
  unit: string;
  displayText: string;
  displayText_Short: string;
  unitText: string;
}

export interface FlightGeneralInfoI {
  groupFares: GroupFareI[];
  groupId: string;
  id: string;
  oneAdultTotalFare: number;
  totalFareAmount: number;
  currencyCode: string;
  passengersCount: {
    adult: number;
    child: number;
    infant: number;
  };
}

export interface AdultInformationI {
  firstName: string;
  lastName: string;
  nationality: PlaceI;
  nationalId: string;
  birthDate: string;
  passportNumber: string;
  passportExpiryDate: string;
  gender: number;
}

interface ChildInformationI extends AdultInformationI {}

export interface PassengerInformationI {
  contactInformation: {
    mobileNumber: string;
    emailAddress: string;
  };
  adults: AdultInformationI[];
  children: ChildInformationI[];
}

export interface PassengerI {
  gender: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  passportExpireDate: string;
  passportId: string;
  passengerIndex: number;
  passengerType: number;
  nationalId: string;
  parentIndex: number;
}

export interface PassengersInfoI {
  emailAddess: string;
  telephoneNo: string;
  mobileNo: MobileNoI;
  passengers: PassengerI[];
}

export interface MobileNoI {
  countryCode: string;
  cellPhoneNumber: string;
}

export interface AddToCartResultI {
  invoiceCode: string;
  fullPaymentAmount: number;
  currencyCode: string;
  addToCartDetail: AddToCartDetail[];
  warning: Warning[];
  paymentType: number;
  notEnoughtCredit: boolean;
}

export interface AddToCartDetail {
  priceDetailID: string;
  fullTotalAmount: number;
  currencyCode: string;
  priceChanged: boolean;
  flightReserveDetail: FlightReserveDetail;
  invoiceReserveDetail: InvoiceReserveDetail;
  invoiceContactList: InvoiceContactList;
  warning: Warning;
  finalServicePrice: number;
  orginalPrices: OrginalPrice[];
}

export interface OrginalPrice {
  passengerType: number;
  passengerIndex: number;
  travelerCode: string;
  orginalAmount: number;
}

export interface InvoiceContactList {
  contactOwnerTypeID: number;
  address: string;
  emailAddress: string;
  cellphoneNumber: string;
  phoneNumber: string;
}

export interface InvoiceReserveDetail {
  finalReserveOject: string;
  providerID: number;
}

export interface Warning {
  warningCode: string;
  warningMessage: string;
}

export interface FlightReserveDetail {
  mainPNR: string;
  reservedItem: boolean;
  maxReserveDate: string;
}

export type FlightTypeI = "domestic" | "international";
export type WayTypeI = "One Way" | "Round-trip";
export type FlightClassI = "business" | "economy";
