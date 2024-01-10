export interface VendorI {
  id: string;
  userId: string;
  name: string;
  active: boolean;
  creationDate: string;
  expireDate: string;
  phone: string;
  email: string;
}

export interface VendorsI {
  data: VendorI[];
  totalRowCount: number;
}

export interface VendorsTableDataI {
  result: VendorsI;
  hasError: boolean;
  message: string;
}

export interface NullResultI {
  result: null;
  hasError: boolean;
  message: string;
}
export interface AddVendorHotelRoomI {
  result: { roomId: string };
  hasError: boolean;
  message: string;
}

export interface VendorContactsApiI {
  name: string;
  type: number;
  title: string;
  value: string;
}

export interface VendorInfoI {
  name: string;
  address: string;
  webSite: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  currencyId: string;
  currencyName: string;
  countryId?: string;
  countryName?: string;
  cityId?: string;
  cityName?: string;
  startDate: string;
  expirationDate: string;
  isActive: boolean;
  users?: any;
  contacts: VendorContactsApiI[];
  vendorHotelRoomSalesChannels: any[];
  vendorHotels: any[];
}

export interface VendorInfoDataI {
  result: VendorInfoI;
  hasError: boolean;
  message: string;
}

export interface VendorRoomI {
  id: string;
  vendorId: string;
  vendorName: string;
  active: boolean;
  roomName: string;
  defaultVendorHotelRoomNames: string;
  vendorHotelRoomBaseTypeName: string;
}

export interface HotelInformationI {
  [x: string]: any;
  active: boolean;
  stayId: string;
  hotelName: string;
  countryId: string;
  cityId: string;
  cityName: string;
  countryName?: string;
  stayType: string;
  stayTypeId: string;
  vendorRooms: VendorRoomI[];
}

export interface VendorHotelRoomsInfoI {
  data: HotelInformationI[];
  totalRowCount: number;
}

export interface VendorHotelRoomsDataI {
  result: VendorHotelRoomsInfoI;
  hasError: boolean;
  message: string;
}
export interface RoomBaseTypeI {
  id: string;
  name: string;
  description: string;
  standardCapacity: number;
  extraCapacity: number;
}
export interface RoomBaseTypeListDataI {
  result: RoomBaseTypeI[];
  hasError: boolean;
  message: string;
}

export interface VendorHotelRoomBaseCapacityI {
  id: string;
  name: string;
  baseTypeRequired: boolean;
  standardCapacity: number;
  extraCapacity: number;
}
export interface VendorHotelRoomBaseCapacityListDataI {
  result: { data: VendorHotelRoomBaseCapacityI[]; totalRowCount: number };
  hasError: boolean;
  message: string;
}

export interface HotelRoomViewTypeI {
  id: string;
  name: string;
  description: string;
}
export interface HotelRoomViewTypesI {
  result: HotelRoomViewTypeI[];
  hasError: boolean;
  message: string;
}
export interface HotelRoomPensionI {
  id: string;
  name: string;
  description: string;
}
export interface HotelRoomPensionsI {
  result: HotelRoomPensionI[];
  hasError: boolean;
  message: string;
}

export interface RoomPropertyListI {
  id: string;
  name: string;
  description: string;
}

export interface RoomPropertiesListI {
  result: RoomPropertyListI[];
  hasError: boolean;
  message: string;
}

export interface AddVendorHotelRoomNameI {
  vendorHotelRoomId: string;
  vendorHotelRoomNames: {
    name: string;
    languageId: string;
  }[];
}
export interface AddVendorHotelRoomDescriptionI {
  vendorHotelRoomId: string;
  roomDescriptions: {
    shortDescription: string;
    longDescription: string;
    languageId: string;
  }[];
}

export interface VendorHotelRoomResultDataI {
  result: VendorHotelRoomResultI;
  hasError: boolean;
  message: string;
}

export interface CancellationPolicyDTOI {
  id: string;
  vendorHotelRoomId: string;
  salesChannelId: string;
  title: string;
  fromDate: string;
  toDate: string;
  freeCancellationDay: number;
  cancellationPolicy1Day: number;
  cancellationPolicy1Percent: number;
  cancellationPolicy2Day: number;
  cancellationPolicy2Percent: number;
  noShowTimePercent: number;
}

export interface VendorHotelRoomFacilityI {
  roomPropertyId: string;
}

export interface VendorHotelRoomResultI {
  name: string;
  active: boolean;
  vendor: {
    id: string;
    name: string;
    active: boolean;
  };
  hotel: HotelI;
  vendorHotelRoomBaseType: VendorHotelRoomBaseTypeI;
  vendorHotelRoomDetail: VendorHotelRoomDetailI;
  vendorHotelRoomAvailabilities?: null[];
  vendorHotelRoomNames?: VendorHotelRoomNamesEntityI[];
  vendorHotelRoomFacility?: VendorHotelRoomFacilityI[];
  vendorHotelRoomDescription?: VendorHotelRoomDescriptionEntityI[];
  cancellationPolicyDTO: CancellationPolicyDTOI[];
}
export interface HotelI {
  id: string;
  hotelDetailId: string;
  addressId: string;
  name: string;
}
export interface VendorHotelRoomBaseTypeI {
  id: string;
  name: string;
  description: string;
}
export interface VendorHotelRoomDetailI {
  id: string;
  vendorHotelRoomViewTypeId: string;
  minSize: number;
  maxSize: number;
  nonRefundable: boolean;
  roomSoldAskSellOnly: boolean;
  roomNumbers: string;
  vendorHotelRoomBookingTheBasisId: string;
  note: string;
  bedRoomCount: string;
  extraCapacity: number;
  standardCapacity: number;
}
export interface VendorHotelRoomNamesEntityI {
  id: string;
  name: string;
  languageId: string;
  languageName: string;
}
export interface VendorHotelRoomDescriptionEntityI {
  shortDescription: string;
  longDescription: string;
  languageId: string;
  vendorHotelRoomId: string;
  languageName: string;
}

export interface AvailabilityI {
  date: string;
  totalAvailableCount: number;
  totalBookedCount: number;
  totalRemainigCount: string;
}

export interface RoomAvailabilityListI {
  availablity: AvailabilityI[];
  roomName: string;
  roomId: string;
  salesChannelId: string;
  salesChannelName: string;
}
export interface RoomAvailabilityListResultI {
  data: RoomAvailabilityListI[];
  totalRowCount: number;
}

export interface VendorHotelsI {
  id: string;
  hotelNote: string;
  active: boolean;
}
export interface VendorHotelsDataI {
  data: VendorHotelsI[];
  totalRowCount: number;
}

export interface RoomMarketI {
  date: string;
  roomName: string;
  roomId: string;
  salesChannelName: string;
  salesChannelId: string;
  vendorId: string;
  vendorName: string;
  basePrice: number;
  extraAdultPrice: number;
  extraInfantPrice: number;
  extraChild1Price: number;
  extraChild2Price: number;
  maximumAllowedSalesPerDay: number;
  roomAvailabilityId: string;
  roomMarketId: string;
  currencyId: string;
  editable: boolean;
}

export interface EditStayRoomI {
  roomId: string;
  hotelId: string;
  vendorHotelRoomDetailId: string;
  name: string;
  active?: boolean;
  standardCapacity: number;
  extraCapacity: number;
  minSize: number;
  maxSize: number;
  nonRefundable?: boolean;
  roomSoldAskSellOnly?: boolean;
  roomNumbers: string;
  vendorHotelRoomPensionId: string;
  vendorHotelRoomBaseTypeId: string;
  vendorHotelRoomViewTypeId: string;
  bedRoomCount: number;
  note: string;
  roomDescription: {
    shortDescription: string;
    longDescription: string;
    languageId: string;
  };
}

export interface RoomMarketListResultI {
  data: RoomMarketI[];
  totalRowCount: number;
}

export interface AddNewVendorResultI {
  password: string;
  id: string;
}

export interface ApiResponseI<T> {
  result: T;
  hasError: boolean;
  message: string;
}
