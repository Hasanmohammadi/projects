import Cookies from 'js-cookie';

export const BASE_URL = 'http://172.31.30.228:8001/';

export const VENDOR_URLS = {
  GET_VENDOR: `${BASE_URL}api/Vendor/GetVendor`,
  GET_VENDOR_HOTEL_ROOMS_URLS: `${BASE_URL}api/Vendor/GetVendorHotelRooms`,
  GET_VENDOR_HOTELS: `${BASE_URL}api/Stay/GetVendorHotels`,
  POST_ADD_VENDOR: `${BASE_URL}api/Vendor/AddVendor`,
  POST_COPY_PRICE: `${BASE_URL}api/Vendor/CopyPrice`,
  PUT_EDIT_VENDOR: `${BASE_URL}api/Vendor/EditVendor`,
  PUT_CHANGE_VENDOR_STATUS: `${BASE_URL}api/Vendor/ChangeVendorStatus`,
};

export const VENDORS_URLS = {
  GET_VENDORS: `${BASE_URL}api/Vendor/GetVendors`,
};

export const VENDOR_HOTEL_ROOMS_URLS = {
  GET_HOTEL_ROOM_BASE_TYPE_LIST: `${BASE_URL}api/Vendor/GetHotelRoomBaseTypeList`,
  GET_ROOM_TYPE_CAPACITY: `${BASE_URL}api/Vendor/GetVendorHotelRoomBaseCapacityList`,
  GET_HOTEL_ROOM_VIEW_TYPES: `${BASE_URL}api/Vendor/GetVendorHotelRoomViewTypeList`,
  GET_VENDOR_HOTEL_ROOM_PENSIONS: `${BASE_URL}api/Vendor/GetVendorHotelRoomPensions`,
  GET_VENDOR_HOTEL_ROOM: `${BASE_URL}api/Vendor/GetVendorHotelRoom`,
  GET_ROOM_PROPERTY_LIST: `${BASE_URL}api/Vendor/GetVendorHotelRoomPropertyList`,
  GET_VENDOR_HOTEL_ROOM_AVAILABILITY_LIST: `${BASE_URL}api/Vendor/GetVendorHotelRoomAvailabilityList`,
  GET_VENDOR_HOTEL_ROOM_MARKET_LIST: `${BASE_URL}api/Vendor/GetVendorHotelRoomMarketList`,
  POST_ADD_VENDOR_HOTEL_ROOM: `${BASE_URL}api/Vendor/AddVendorHotelRoom`,
  POST_ADD_VENDOR_HOTEL_ROOM_FACILITY: `${BASE_URL}api/Vendor/AddVendorHotelRoomFacility`,
  POST_ADD_VENDOR_HOTEL_ROOM_DESCRIPTION: `${BASE_URL}api/Vendor/AddVendorHotelRoomDescription`,
  POST_ADD_VENDOR_HOTEL_ROOM_NAME: `${BASE_URL}api/Vendor/AddVendorHotelRoomName`,
  POST_ADD_CANCELLATION_POLICY: `${BASE_URL}api/Vendor/AddCacellationPolicy`,
  POST_ADD_GENERAL_POLICY: `${BASE_URL}api/Vendor/AddGeneralPolicy`,
  POST_ADD_HOTEL_ROOM_AVAILABILITY: `${BASE_URL}api/Vendor/AddVendorHotelRoomAvailability`,
  PUT_EDIT_VENDOR_HOTEL_ROOM_DESCRIPTION: `${BASE_URL}api/Vendor/EditVendorHotelRoomDescription`,
  PUT_EDIT_VENDOR_HOTEL_ROOM_NAME: `${BASE_URL}api/Vendor/EditVendorHotelRoomName`,
  PUT_EDIT_VENDOR_HOTEL_ROOM_MARKET: `${BASE_URL}api/Vendor/EditVendorHotelRoomMarket`,
  PUT_EDIT_STAY_ROOM: `${BASE_URL}api/Vendor/EditVendorHotelRoom`,
  PUT_CHANGE_STATUS_STAY_ROOM: `${BASE_URL}api/Vendor/ChangeRoomStatus`,
};

export const MARKET_URLS = {
  GET_CURRENCY_LIST: `${BASE_URL}api/Market/GetCurrencyList`,
  GET_MARKET_LIST: `${BASE_URL}api/Market/GetMarketList`,
};

export const GENERAL_URLS = {
  GET_COUNTRIES: `${BASE_URL}api/General/GetCountries`,
  GET_CITIES: `${BASE_URL}api/General/GetCities`,
  GET_LANGUAGES: `${BASE_URL}api/General/GetAvailableLanguages`,
};

export const AUTH_URLS = {
  POST_LOGIN: `${BASE_URL}api/Auth/Login`,
  POST_RESET_PASSWORD: `${BASE_URL}api/Auth/ResetPassword`,
};

export const SALES_CHANNEL_URLS = {
  GET_SALES_CHANNEL: `${BASE_URL}api/SalesChannel/Get`,
  GET_SALES_CHANNEL_LIST: `${BASE_URL}api/SalesChannel/List`,
  GET_SALES_CHANNEL_PAYMENT_TYPE_LIST: `${BASE_URL}api/SalesChannel/GetPaymentTypeList`,
  POST_ADD_NEW_SALES_CHANNEL: `${BASE_URL}api/SalesChannel/Add`,
  POST_ADD_VENDOR_SALES_CHANNEL: `${BASE_URL}api/SalesChannel/AddVendorSalesChannel`,
  PUT_CHANGE_SALES_CHANNEL_STATUS: `${BASE_URL}api/SalesChannel/ChangeStatus`,
  PUT_EDIT_SALES_CHANNEL: `${BASE_URL}api/SalesChannel`,
};

export const STAY_URLS = {
  GET_STAY_INFORMATION: `${BASE_URL}api/Stay/Get`,
  GET_STAY_TYPE: `${BASE_URL}api/Stay/GetStayTypes`,
  GET_HOTEL_PROPERTY_LIST: `${BASE_URL}api/Stay/GetHotelPropertyList`,
  GET_STAYS_LIST: `${BASE_URL}api/Stay`,
  GET_HOTEL_PROPERTY_CATEGORY: `${BASE_URL}api/Stay/GetHotelPropertyCategoryList`,
  GET_HOTEL_PHOTO_CATEGORY_LIST: `${BASE_URL}api/Stay/GetHotelPhotoCategoryList`,
  POST_ADD_BASE_HOTEL: `${BASE_URL}api/Stay/AddBaseHotel`,
  POST_ADD_HOTEL_DETAIL: `${BASE_URL}api/Stay/AddHotelDetail`,
  POST_ADD_STAY_PROPERTY: `${BASE_URL}api/Stay/AddHotel_HotelProperty`,
  POST_ADD_STAY_POLICY: `${BASE_URL}api/Stay/AddStayPolicy`,
  POST_ADD_STAY_DESCRIPTION: `${BASE_URL}api/Stay/AddHotelDescription`,
  POST_ADD_STAY_NAME: `${BASE_URL}api/Stay/AddHotelName`,
  POST_ADD_STAY_PHOTOS: `${BASE_URL}api/Stay/AddHotelPhoto`,
  POST_ADD_VENDOR_STAY: `${BASE_URL}api/Stay/AddVendorStay`,
  PUT_CHANGE_STAY_NAMES: `${BASE_URL}api/Stay/EditHotelNames`,
  PUT_CHANGE_STAY_DESCRIPTION: `${BASE_URL}api/Stay/EditHotelDescription`,
  PUT_EDIT_HOTEL_DETAIL: `${BASE_URL}api/Stay/EditHotel`,
  PUT_EDIT_STAY_POLICY: `${BASE_URL}api/Stay/EditStayPolicy`,
  PATCH_CHANGE_STAY_STATUS: `${BASE_URL}api/Stay/ChangeStayStatus`,
  DELETE_STAY: `${BASE_URL}api/Stay`,
  DELETE_STAY_PHOTO: `${BASE_URL}api/Stay/DeleteStayPhoto`,
};

export const SEARCH_URLS = {
  GET_HOTEL_ROOMS_BOOKING: `${BASE_URL}api/Stay/SearchHotelRooms`,
};

export const BOOK_URLS = {
  POST_BOOK_BY_ADMIN: `${BASE_URL}api/Stay/BookByAdmin`,
};

export const token = Cookies.get('userToken');
