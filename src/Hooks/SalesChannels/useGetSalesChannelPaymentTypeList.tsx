import { getSalesChannelPaymentTypeList } from 'Services/SalesChannel';
import { PaymentTypeListI } from 'Types/SalesChannels';
import { useQuery } from 'react-query';

export default function useGetSalesChannelListPaymentTypeList() {
  const { data: salesChannelPaymentTypeListData } = useQuery<
    PaymentTypeListI,
    Error
  >({
    queryKey: 'salesChannelPaymentTypeList',
    queryFn: () => getSalesChannelPaymentTypeList(),
  });

  return {
    salesChannelPaymentTypeListData,
  };
}
