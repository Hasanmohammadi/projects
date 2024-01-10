import { useAppContext } from 'Context';
import { getVendorHotelRooms } from 'Services/Vendors';
import { VendorHotelRoomsInfoI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface UseGetVendorHotelRoomsPropsI {
  name?: string;
  filterHotelRoomTypeId?: string;
  hotelId?: string;
  tableMode?: boolean;
  searchAt?: 'roomName' | 'stayName';
}

export default function useGetVendorHotelRooms({
  filterHotelRoomTypeId,
  hotelId,
  tableMode = false,
  name,
  searchAt,
}: UseGetVendorHotelRoomsPropsI) {
  const { vendorIdSelected } = useAppContext();

  const [searchParams] = useSearchParams();
  const [pageSize] = useState(6);
  const [page, setPage] = useState(Number(searchParams.get('page')));

  const conditions = tableMode
    ? vendorIdSelected.length > 23
    : vendorIdSelected.length > 23 && !!hotelId && hotelId?.length > 23;

  const refetchCondition = tableMode
    ? vendorIdSelected.length > 23
    : vendorIdSelected.length > 23 && hotelId && hotelId?.length > 23;

  const {
    data: vendorHotelRoomsData,
    isLoading,
    refetch,
  } = useQuery<VendorHotelRoomsInfoI, Error>(
    'vendorHotelRooms',
    () =>
      getVendorHotelRooms({
        page,
        pageSize,
        orderBy: 'stayId',
        sortType: 'DESC',
        filterHotelRoomTypeId,
        vendorIdSelected,
        hotelId,
        name,
        searchAt,
      }),
    {
      cacheTime: 0,
      enabled: conditions,
    },
  );

  useEffect(() => {
    if (refetchCondition) {
      refetch().catch((err) => {
        console.log('refetch error', err);
      });
    }
  }, [
    refetch,
    page,
    pageSize,
    name,
    filterHotelRoomTypeId,
    vendorIdSelected,
    hotelId,
    refetchCondition,
  ]);

  return {
    vendorHotelRoomsData,
    isLoading,
    page,
    setPage,
    pageSize,
    getVendorHotelRoomsAction: refetch,
  };
}
