import { SEARCH_URLS } from 'Constants/urls';
import { ResponseResultI, SearchHotelRoomsResultI } from 'Types/Search';
import axios from 'axios';
import Cookies from 'js-cookie';

interface GetSearchHotelRoomsArgsI {
  hotelId: string;
  checkIn: string;
  checkOut: string;
  vendorId: string;
}

const getSearchHotelRooms = async ({
  checkIn,
  checkOut,
  hotelId,
  vendorId,
}: GetSearchHotelRoomsArgsI) => {
  console.log('🚀 ~ file: getSearchHotelRooms.ts:19 ~ hotelId:', hotelId);
  const response = await axios.get<
    ResponseResultI<SearchHotelRoomsResultI>
  >(SEARCH_URLS.GET_HOTEL_ROOMS_BOOKING, {
    headers: {
      Authorization: `Bearer ${Cookies.get('userToken') as string}`,
    },
    params: {
      checkIn,
      checkOut,
      hotelId,
      vendorId,
    },
  });

  return response.data.result;
};

export default getSearchHotelRooms;
