import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { VendorHotelRoomResultDataI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getVendorHotelRoom = async ({ roomId }: { roomId: string }) => {
  const response = await axios.get<VendorHotelRoomResultDataI>(
    VENDOR_HOTEL_ROOMS_URLS.GET_VENDOR_HOTEL_ROOM,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        vendorHotelRoomId: roomId,
      },
    },
  );

  return response?.data?.result;
};

export default getVendorHotelRoom;
