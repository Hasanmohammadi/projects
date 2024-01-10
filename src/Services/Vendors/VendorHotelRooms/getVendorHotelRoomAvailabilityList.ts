import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { ApiResponseI, RoomAvailabilityListResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getVendorHotelRoomAvailabilityList = async ({
  vendorHotelRoomId,
  date,
}: {
  vendorHotelRoomId: string;
  date: { from: string; to: string };
}) => {
  const response = await axios.get<
    ApiResponseI<RoomAvailabilityListResultI>
  >(VENDOR_HOTEL_ROOMS_URLS.GET_VENDOR_HOTEL_ROOM_AVAILABILITY_LIST, {
    headers: {
      Authorization: `Bearer ${Cookies.get('userToken') as string}`,
    },
    params: {
      take: 1000,
      OrderBy: 'Date',
      'filters.RoomId': vendorHotelRoomId,
      from: date?.from,
      to: date?.to,
    },
  });

  return response?.data?.result;
};

export default getVendorHotelRoomAvailabilityList;
