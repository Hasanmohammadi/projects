import { useAppContext } from 'Context';
import { getVendorHotelRoomMarketList } from 'Services/Vendors/VendorHotelRooms';
import { RoomMarketListResultI } from 'Types/Vendors';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function useGetVendorHotelRoomMarketList({
  date,
  salesChannelId,
  roomId,
}: {
  date: { from: string; to: string };
  salesChannelId: string;
  roomId: string;
}) {
  const { vendorIdSelected } = useAppContext();
  const {
    data: VendorHotelRoomMarketListData,
    isLoading,
    refetch,
  } = useQuery<RoomMarketListResultI, Error>(
    'getVendorHotelRoomMarketList',
    () =>
      getVendorHotelRoomMarketList({
        roomId,
        vendorId: vendorIdSelected,
        from: date?.from,
        to: date?.to,
        salesChannelId,
      }),
    {
      enabled: salesChannelId.length > 23 && roomId.length > 23,
    },
  );

  useEffect(() => {
    if (
      roomId.length > 23 &&
      !date?.to.includes('undefined') &&
      salesChannelId.length > 23
    ) {
      refetch().catch((err) => console.log(err));
    }
  }, [roomId, vendorIdSelected, refetch]);

  return {
    VendorHotelRoomMarketListData,
    isLoading,
    vendorHotelRoomMarketListAction: refetch,
  };
}
