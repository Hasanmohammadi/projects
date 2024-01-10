import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { HotelRoomPensionsI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getVendorHotelRoomPensions = async () => {
  const response = await axios.get<HotelRoomPensionsI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_VENDOR_HOTEL_ROOM_PENSIONS,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response?.data?.result;
};

export default getVendorHotelRoomPensions;
