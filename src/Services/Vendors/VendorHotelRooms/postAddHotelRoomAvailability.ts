import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { convertTableFormatToUtc } from 'Helpers';
import { NullResultI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

interface PostAddHotelRoomAvailabilityArgsI {
  vendorHotelRoomId: string;
  dateRange: {
    date: string;
    totalAvailableCount: number;
  }[];
}
const postAddHotelRoomAvailability = async ({
  vendorHotelRoomId,
  dateRange,
}: PostAddHotelRoomAvailabilityArgsI) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_HOTEL_ROOM_AVAILABILITY,
    {
      vendorHotelRoomId,
      dateRange: dateRange.map(({ date, totalAvailableCount }) => ({
        date: convertTableFormatToUtc(date),
        totalAvailableCount,
      })),
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddHotelRoomAvailability;
