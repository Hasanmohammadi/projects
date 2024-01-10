import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { VendorHotelRoomBaseCapacityListDataI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getVendorHotelRoomBaseCapacityList = async () => {
  const response = await axios.get<VendorHotelRoomBaseCapacityListDataI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_ROOM_TYPE_CAPACITY,
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

export default getVendorHotelRoomBaseCapacityList;
