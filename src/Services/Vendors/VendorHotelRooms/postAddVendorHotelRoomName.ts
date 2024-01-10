import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import {
  AddVendorHotelRoomNameI,
  NullResultI,
} from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddVendorHotelRoomName = async ({
  vendorHotelRoomId,
  vendorHotelRoomNames,
}: AddVendorHotelRoomNameI) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_VENDOR_HOTEL_ROOM_NAME,
    {
      vendorHotelRoomId,
      vendorHotelRoomNames,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendorHotelRoomName;
