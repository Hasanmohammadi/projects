import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { RoomPropertiesListI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getRoomPropertiesList = async () => {
  const response = await axios.get<RoomPropertiesListI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_ROOM_PROPERTY_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        sortType: 'ASC',
        orderBy: 'Id',
      },
    },
  );

  return response?.data?.result;
};

export default getRoomPropertiesList;
