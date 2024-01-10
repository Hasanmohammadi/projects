export interface NullResultI {
  result: null;
  hasError: boolean;
  message: string;
}
export interface ApiResponseI<T> {
  result: T;
  hasError: boolean;
  message: string;
}

export interface StayTypeI {
  name: string;
  id: string;
}
export interface StayTypeListI {
  data: StayTypeI[];
  totalRowCount: number;
}

export interface AddBaseHotelI {
  stayId: string;
  stayTypeId: string;
  stayTypeName: string;
}

export interface AddHotelDetailInfoI {
  name: string;
  description: string;
  stayId: string;
  primaryMobilePhone: string;
  fax: string;
  email: string;
  website: string;
  postalCode: string;
  hotelDetailId?: string;
  locationDistanceList: LocationDistanceListI;
  stayLocation: StayLocationI;
  officialName: string;
}

export interface LocationDistanceListI {
  [key: string]: string;
}

export interface StayLocationI {
  hotelId: string;
  addressDetail: string;
  latitude: string;
  longitude: string;
  countryId: string;
  cityId: string;
  cityName: string;
}

export interface StayProperties {
  name: string;
  propertyId: string;
}

export interface StayPropertyResult {
  data: StayProperties[];
  totalRowCount: number;
}
export interface StayCategories {
  name: string;
  id: string;
}

export interface StayCategoryResult {
  data: StayCategories[];
  totalRowCount: number;
}
export interface StayPhotoCategoriesI {
  propertyName: string;
  propertyDescription: string;
  propertyId: string;
}

export interface StayPhotoCategoryResultI {
  data: StayPhotoCategoriesI[];
  totalRowCount: number;
}

export interface StaysI {
  name: string;
  id: string;
  checked: boolean;
  active: boolean;
}

export interface StaysListResultI {
  data: StaysI[];
  totalRowCount: number;
}

export interface StayInformationResultI {
  hotelId: string;
  note: string;
  hotelDetailId: string;
  addressId: string;
  hotelDescription: StayDescriptionI[];
  hotelProperties: StayProperties[];
  hotelName: StayNameI[];
  officialName: string;
  email: string;
  fax: string;
  website: string;
  number: string;
  postalCode: string;
  locationDistance: LocationDistanceListI;
  hotelAddrerss: StayLocationI;
  generalDescription: string;
  hotelPhotos: HotelPhotosInfoI[];
  policy: StayPolicyI;
}

export interface PolicyI {
  name: string;
  type: number;
  from: number;
  to: number;
  bedRequired: boolean;
}

export interface StayPolicyI {
  vendorStayPolicyId: string;
  stayPolicyId: string;
  cancellationPolicy: {
    adultOnly: boolean;
    couplesOnly: boolean;
    cancellationHour: number;
    cancellationMinute: number;
  };
  child1: PolicyI;
  child2: PolicyI;
  infant: PolicyI;
}

export interface HotelPhotosInfoI {
  categoryId: string;
  categoryName: string;
  id: string;
  urls: HotelPhotosUrls[];
}

export interface HotelPhotosUrls {
  id: string;
  link: string;
  name: string;
}
export interface StayDescriptionI {
  id: string;
  shortDescription: string;
  longDescription: string;
  languageName: string;
  languageCode: string;
  languageId: string;
}

export interface StayNameI {
  id: string;
  name: string;
  languageName: string;
  languageCode: string;
  languageId: string;
}

export interface AddVendorStayNamesI {
  hotelId: string;
  editHotelNames: {
    name: string;
    languageId: string;
  }[];
}
export interface AddVendorDescriptionI {
  hotelId: string;
  hotelDescriptionsDetailes: {
    shortDescription: string;
    longDescription: string;
    languageId: string;
  }[];
}

export interface EditStayPolicyI {
  childPolicies: ChildPolicyI[];
  hotelId: string;
  vendorId: string;
  noShowMin: number;
  noshowHour: number;
  onlyAdultAccepted: boolean;
  onlyManNotAccepted: boolean;
  stayPolicyId: string;
  vendorStayPolicyId: string;
}

export interface ChildPolicyI {
  bedRequired: boolean;
  passengerType: number;
  toAge: number;
  fromAge: number;
}
