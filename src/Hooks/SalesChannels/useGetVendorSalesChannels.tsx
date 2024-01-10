import { useAppContext } from 'Context';
import { getVendorSalesChannels } from 'Services/SalesChannel';
import { SalesChannelListResultI } from 'Types/SalesChannels';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface GetSalesChannelArgs {
  salesChannelName?: string;
  pageDataSize?: number;
  enabled?: boolean;
}

export default function useGetVendorSalesChannels({
  salesChannelName,
  pageDataSize = 6,
  enabled = true,
}: GetSalesChannelArgs) {
  const [searchParams] = useSearchParams();
  const [pageSize] = useState(pageDataSize);
  const { vendorIdSelected, hotelId } = useAppContext();

  const { data, isLoading, refetch, error, remove } = useQuery<
    SalesChannelListResultI,
    Error
  >({
    queryKey: 'vendorSalesChannelList',
    queryFn: () =>
      getVendorSalesChannels({
        page: Number(searchParams.get('page')),
        pageSize,
        vendorId: vendorIdSelected,
        name: salesChannelName as string,
      }),

    enabled,
    cacheTime: 0,
  });

  useEffect(() => {
    if (enabled) {
      remove();
      refetch().catch((err) => {
        console.log('refetch error', err);
      });
    }
  }, [
    refetch,
    searchParams.get('page'),
    pageSize,
    salesChannelName,
    searchParams.get('search'),
    vendorIdSelected,
    hotelId,
    enabled,
  ]);

  return {
    vendorSalesChannelListData: data as SalesChannelListResultI,
    isLoading,
    pageSize,
    error,
    getVendorSalesChannelListAction: refetch,
  };
}
