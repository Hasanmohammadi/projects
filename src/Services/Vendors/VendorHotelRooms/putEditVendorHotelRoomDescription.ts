import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import { AddVendorHotelRoomDescriptionI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const putEditVendorHotelRoomDescription = async ({
  roomDescriptions,
  vendorHotelRoomId,
}: AddVendorHotelRoomDescriptionI) => {
  const response = await axios.put<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.PUT_EDIT_VENDOR_HOTEL_ROOM_DESCRIPTION,
    {
      roomDescriptions,
      vendorHotelRoomId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditVendorHotelRoomDescription;
