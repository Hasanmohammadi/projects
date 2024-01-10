import { getVendorHotelRoom } from 'Services/Vendors/VendorHotelRooms';
import { VendorHotelRoomResultI } from 'Types/Vendors/vendors';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

interface UseGetVendorHotelRoomI {
  roomId: string;
}

export default function useGetVendorHotelRoom({
  roomId,
}: UseGetVendorHotelRoomI) {
  const {
    data: vendorHotelRoomData,
    isLoading,
    refetch: getStayRoomDataAction,
  } = useQuery<VendorHotelRoomResultI, Error>({
    queryKey: 'vendorHotelRoom',
    queryFn: () => getVendorHotelRoom({ roomId }),
    cacheTime: 0,
    enabled: roomId.length > 23,
  });

  useEffect(() => {
    if (roomId.length > 23) {
      getStayRoomDataAction().catch((err) => console.log(err));
    }
  }, [roomId]);

  return {
    vendorHotelRoomData: vendorHotelRoomData || null,
    isLoading,
    getStayRoomDataAction,
  };
}
