export interface ResponseResultI<T> {
  result: T;
  hasError: boolean;
  message: string;
}

export interface SearchHotelRoomsResultI {
  data: SearchHotelRoomI[];
  totalRowCount: number;
}

export interface SearchHotelRoomI {
  roomName: string;
  hotelName: string;
  cityName: string;
  hotelShortDescription: string;
  hotelImageLinks: string;
  marketName: string;
  typeOfRoom: string;
  roomFacility: string;
  date: Date;
  countryId: string;
  provinceId: string;
  cityId: string;
  stayId: string;
  roomId: string;
  standardCapacity: number;
  extraCapacity: number;
  maxInfantAge: number;
  maxChild1Age: number;
  maxChild2Age: number;
  infantBedRequired: boolean;
  child1BedRequired: boolean;
  child2BedRequired: boolean;
  basePrice: number;
  extraAdultPrice: number;
  extraInfantPrice: number;
  extraChild1Price: number;
  extraChild2Price: number;
  salesChannelId: string;
  saleschannelName: string;
}
