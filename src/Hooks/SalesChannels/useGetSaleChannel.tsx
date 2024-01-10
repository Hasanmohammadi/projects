import { getSaleChannel } from 'Services/SalesChannel';
import { SalesChannelResultI } from 'Types/SalesChannels';
import { useQuery } from 'react-query';
import { Params } from 'react-router-dom';

interface UseGetSaleChannelArgsI {
  salesChannelId: string | Readonly<Params<string>>;
  vendorId: string;
}

export default function useGetSaleChannel({
  salesChannelId,
  vendorId,
}: UseGetSaleChannelArgsI) {
  const { data: saleChannelData, isLoading } = useQuery<
    SalesChannelResultI,
    Error
  >({
    queryKey: 'saleChannel',
    queryFn: () => getSaleChannel({ salesChannelId, vendorId }),
    cacheTime: 0,
  });

  return {
    saleChannelData: saleChannelData as SalesChannelResultI,
    isLoading,
  };
}
