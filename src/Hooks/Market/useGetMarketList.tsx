import { useAppContext } from 'Context';
import getMarketList from 'Services/Market/getMarketList';
import { MarketListI } from 'Types/Market/Market';
import { useQuery } from 'react-query';

export default function useGetMarketList() {
  const { vendorIdSelected } = useAppContext();

  const { data, error, isLoading } = useQuery<MarketListI, Error>({
    queryKey: 'marketList',
    queryFn: () => getMarketList({ vendorId: vendorIdSelected }),
  });

  return {
    marketListData: data?.data,
    error,
    isLoading,
    totalRowCount: data?.totalRowCount,
  };
}
