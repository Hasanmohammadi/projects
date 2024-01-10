import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { AddVendorHotelRoomNameI, NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditVendorHotelRoomName = async ({
  vendorHotelRoomId,
  vendorHotelRoomNames,
}: AddVendorHotelRoomNameI) => {
  const response = await axios.put<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.PUT_EDIT_VENDOR_HOTEL_ROOM_NAME,
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

export default putEditVendorHotelRoomName;
