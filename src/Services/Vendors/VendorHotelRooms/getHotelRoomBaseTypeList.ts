import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { RoomBaseTypeListDataI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getHotelRoomBaseTypeList = async () => {
  const response = await axios.get<RoomBaseTypeListDataI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_HOTEL_ROOM_BASE_TYPE_LIST,
    {
      params: {
        withCapacity: true,
      },
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response?.data?.result;
};

export default getHotelRoomBaseTypeList;
