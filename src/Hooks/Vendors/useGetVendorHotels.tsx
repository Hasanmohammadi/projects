import { useAppContext } from 'Context';
import { getVendorHotels } from 'Services/Vendors';
import { VendorHotelsDataI } from 'Types/Vendors/vendors';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface UseGetVendorHotelRoomsPropsI {
  hotelName?: string;
  filterTypeId?: string;
  pageSize: number;
  enabled?: boolean;
  isActive?: boolean;
}

export default function useGetVendorHotels({
  pageSize,
  hotelName,
  filterTypeId,
  enabled = true,
  isActive,
}: UseGetVendorHotelRoomsPropsI) {
  const { vendorIdSelected } = useAppContext();
  const [searchParams] = useSearchParams();

  const {
    data: vendorsHotelsData,
    isLoading,
    refetch,
    error,
  } = useQuery<VendorHotelsDataI, Error>({
    queryKey: 'vendorHotels',
    queryFn: () =>
      getVendorHotels({
        vendorId: vendorIdSelected,
        page: Number(searchParams.get('page')),
        pageSize,
        hotelName: hotelName || (searchParams.get('search') as string),
        stayTypeId: filterTypeId as string,
        active: isActive as boolean,
      }),

    enabled: vendorIdSelected.length > 23 && enabled,
    cacheTime: 0,
  });

  useEffect(() => {
    if (vendorIdSelected.length > 23) {
      refetch().catch(() => console.log('error'));
    }
  }, [
    vendorIdSelected,
    pageSize,
    hotelName,
    searchParams.get('page'),
    searchParams.get('filter'),
    refetch,
    enabled,
  ]);

  return {
    vendorsHotelsData,
    getVendorHotelLoading: isLoading,
    error,
    getVendorsHotelsAction: refetch,
    pageSize,
  };
}
