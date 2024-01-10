import { useAppContext } from 'Context';
import { getSalesChannelList } from 'Services/SalesChannel';
import { SalesChannelListResultI } from 'Types/SalesChannels';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface GetSalesChannelArgs {
  salesChannelName?: string;
  pageDataSize?: number;
  enabled?: boolean;
}

export default function useGetSalesChannelsList({
  salesChannelName,
  pageDataSize = 6,
  enabled = true,
}: GetSalesChannelArgs) {
  const [searchParams] = useSearchParams();
  const [pageSize] = useState(pageDataSize);
  const { vendorIdSelected, hotelId } = useAppContext();

  const { data, isLoading, refetch, error } = useQuery<
    SalesChannelListResultI,
    Error
  >({
    queryKey: 'salesChannelList',
    queryFn: () =>
      getSalesChannelList({
        page: Number(searchParams.get('page')),
        pageSize,
      }),

    enabled,
    cacheTime: 0,
  });

  useEffect(() => {
    refetch().catch((err) => {
      console.log('refetch error', err);
    });
  }, [
    refetch,
    searchParams.get('page'),
    pageSize,
    salesChannelName,
    searchParams.get('search'),
    vendorIdSelected,
    hotelId,
  ]);

  return {
    salesChannelListData: data as SalesChannelListResultI,
    isLoading,
    pageSize,
    error,
    getSalesChannelListAction: refetch,
  };
}
