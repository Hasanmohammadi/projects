import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddVendorHotelRoomFacility = async ({
  propertyIds,
  vendorHotelRoomId,
}: {
  propertyIds: string[];
  vendorHotelRoomId: string;
}) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_VENDOR_HOTEL_ROOM_FACILITY,
    {
      propertyIds,
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

export default postAddVendorHotelRoomFacility;
