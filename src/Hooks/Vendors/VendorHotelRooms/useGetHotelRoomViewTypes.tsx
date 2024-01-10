import getHotelRoomViewTypes from 'Services/Vendors/VendorHotelRooms/getHotelRoomViewTypes';
import { HotelRoomViewTypeI } from 'Types/Vendors/vendors';
import { useQuery } from 'react-query';

export default function useGetHotelRoomViewTypes() {
  const { data: hotelRoomViewTypesData, isLoading } = useQuery<
    HotelRoomViewTypeI[],
    Error
  >('getHotelRoomViewTypes', getHotelRoomViewTypes);

  return {
    hotelRoomViewTypesData,
    isLoading,
  };
}
