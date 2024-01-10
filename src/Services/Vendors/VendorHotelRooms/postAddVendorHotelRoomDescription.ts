import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import {
  AddVendorHotelRoomDescriptionI,
  NullResultI,
} from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddVendorHotelRoomDescription = async ({
  roomDescriptions,
  vendorHotelRoomId,
}: AddVendorHotelRoomDescriptionI) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_VENDOR_HOTEL_ROOM_DESCRIPTION,
    {
      vendorHotelRoomId,
      roomDescriptions,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendorHotelRoomDescription;
