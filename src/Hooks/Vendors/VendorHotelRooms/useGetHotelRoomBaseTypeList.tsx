import { getHotelRoomBaseTypeList } from 'Services/Vendors/VendorHotelRooms';
import { RoomBaseTypeI } from 'Types/Vendors';
import { useQuery } from 'react-query';

export default function useGetHotelRoomBaseTypeList() {
  const { data: hotelRoomBaseTypeListData, isLoading } = useQuery<
    RoomBaseTypeI[],
    Error
  >('hotelRoomBaseTypeList', getHotelRoomBaseTypeList);

  return {
    hotelRoomBaseTypeListData,
    isLoading,
  };
}
