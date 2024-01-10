import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

interface PutEditRoomMarketI {
  id: string;
  basePrice: number;
  extraAdultPrice: number;
  extraInfantPrice: number;
  extraChild1Price: number;
  extraChild2Price: number;
  salesChannelId: string;
  vendorHotelRoomAvailabilityId: string;
}

const putEditRoomMarket = async ({
  prices,
}: {
  prices: PutEditRoomMarketI[];
}) => {
  const response = await axios.put<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.PUT_EDIT_VENDOR_HOTEL_ROOM_MARKET,
    {
      prices,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putEditRoomMarket;
