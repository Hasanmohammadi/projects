import { getVendorHotelRoomAvailabilityList } from 'Services/Vendors/VendorHotelRooms';
import { RoomAvailabilityListResultI } from 'Types/Vendors/vendors';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function useGetVendorHotelRoomAvailabilityList({
  vendorHotelRoomId,
  date,
}: {
  vendorHotelRoomId: string;
  date: { from: string; to: string };
}) {
  const {
    data: vendorHotelRoomAvailabilityListData,
    isLoading,
    refetch,
  } = useQuery<RoomAvailabilityListResultI, Error>(
    'vendorHotelRoomAvailabilityList',
    () => getVendorHotelRoomAvailabilityList({ vendorHotelRoomId, date }),
    {
      enabled: false,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (vendorHotelRoomId.length > 23) {
      refetch().catch((err) => {
        console.log('refetch error', err);
      });
    }
  }, [refetch]);

  return {
    vendorHotelRoomAvailabilityListData:
      vendorHotelRoomAvailabilityListData as RoomAvailabilityListResultI,
    availabilityListLoading: isLoading,
    getAvailabilityListAction: refetch,
  };
}
