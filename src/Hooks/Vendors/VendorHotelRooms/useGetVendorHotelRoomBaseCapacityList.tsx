import { getVendorHotelRoomBaseCapacityList } from 'Services/Vendors/VendorHotelRooms';
import { VendorHotelRoomBaseCapacityI } from 'Types/Vendors/vendors';
import { useQuery } from 'react-query';

export default function useGetVendorHotelRoomBaseCapacityList() {
  const { data: VendorHotelRoomBaseCapacityListData, isLoading } =
    useQuery<
      { data: VendorHotelRoomBaseCapacityI[]; totalRowCount: number },
      Error
    >(
      'vendorHotelRoomBaseCapacityList',
      getVendorHotelRoomBaseCapacityList,
    );

  return {
    VendorHotelRoomBaseCapacityListData,
    isLoading,
  };
}
