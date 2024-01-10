import { putChangeSalesChannelStatus } from 'Services/SalesChannel';
import { SalesChannelListResultI } from 'Types/SalesChannels';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from 'react-query';

interface PutChangeSalesChannelStatus {
  getVendorSalesChannelListAction: <TPageData>(
    options?:
      | (RefetchOptions & RefetchQueryFilters<TPageData>)
      | undefined,
  ) => Promise<QueryObserverResult<SalesChannelListResultI, Error>>;
  setChangeStatusModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function usePutChangeSalesChannelStatus({
  getVendorSalesChannelListAction,
  setChangeStatusModal,
}: PutChangeSalesChannelStatus) {
  const { mutate: changeSalesChannelStatusAction, isLoading } =
    useMutation(putChangeSalesChannelStatus, {
      onSuccess: async () => {
        setChangeStatusModal(false);
        await getVendorSalesChannelListAction();
      },
    });

  return { changeSalesChannelStatusAction, isLoading };
}
