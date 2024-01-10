import { getRoomPropertiesList } from 'Services/Vendors/VendorHotelRooms';
import { HotelRoomPensionI } from 'Types/Vendors/vendors';
import { useQuery } from 'react-query';

export default function useGetRoomPropertiesList() {
  const { data: roomPropertiesListData, isLoading } = useQuery<
    HotelRoomPensionI[],
    Error
  >('getRoomPropertiesList', getRoomPropertiesList);

  return {
    roomPropertiesListData,
    isLoading,
  };
}
