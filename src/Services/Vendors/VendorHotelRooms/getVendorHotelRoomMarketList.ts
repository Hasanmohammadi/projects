import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { ApiResponseI } from 'Types/Vendors';
import { RoomMarketListResultI } from 'Types/Vendors/vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getVendorHotelRoomMarketList = async ({
  salesChannelId,
  vendorId,
  roomId,
  from,
  to,
}: {
  salesChannelId: string;
  vendorId: string;
  roomId: string;
  from: string;
  to: string;
}) => {
  const response = await axios.get<ApiResponseI<RoomMarketListResultI>>(
    VENDOR_HOTEL_ROOMS_URLS.GET_VENDOR_HOTEL_ROOM_MARKET_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        take: 1000,
        skip: 0,
        vendorId,
        roomId,
        sortType: 'ASC',
        orderBy: 'Date',
        salesChannelId,
        ...(from && { from }),
        ...(to && { to }),
      },
    },
  );

  return response?.data?.result;
};

export default getVendorHotelRoomMarketList;
