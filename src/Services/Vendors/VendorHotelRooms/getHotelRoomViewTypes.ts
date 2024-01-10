import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { HotelRoomViewTypesI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getHotelRoomViewTypes = async () => {
  const response = await axios.get<HotelRoomViewTypesI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_HOTEL_ROOM_VIEW_TYPES,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response?.data?.result;
};

export default getHotelRoomViewTypes;
