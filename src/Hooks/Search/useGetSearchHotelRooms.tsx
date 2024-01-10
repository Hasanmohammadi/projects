import { getSearchHotelRooms } from 'Services/Search';
import { SearchHotelRoomsResultI } from 'Types/Search';
import { useQuery } from 'react-query';

interface GetSearchHotelRoomsArgsI {
  checkIn: string;
  checkOut: string;
  hotelId: string;
  vendorId: string;
}

export default function useGetSearchHotelRooms({
  checkIn,
  checkOut,
  hotelId,
  vendorId,
}: GetSearchHotelRoomsArgsI) {
  const {
    data: searchHotelRoomsData,
    error,
    isLoading,
    refetch: getSearchHotelRoomsAction,
    remove,
  } = useQuery<SearchHotelRoomsResultI, Error>({
    queryKey: 'hotelRoomsBooking',
    queryFn: () =>
      getSearchHotelRooms({ checkIn, checkOut, hotelId, vendorId }),

    enabled: false,
    cacheTime: 0,
  });

  return {
    searchHotelRoomsData,
    error,
    isLoading,
    getSearchHotelRoomsAction,
    remove,
  };
}
