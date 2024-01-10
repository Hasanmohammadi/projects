import { putChangeVendorStatus } from 'Services/Vendors';
import { useMutation } from 'react-query';

import useGetVendors from './useGetVendors';
import useGetVendorsTable from './useGetVendorsTable';

export default function usePutChangeVendorStatus() {
  const { getVendorsTableAction } = useGetVendorsTable({});
  const { getVendorsAction } = useGetVendors();

  const { mutate: changeVendorStatusAction, isLoading } = useMutation(
    putChangeVendorStatus,
    {
      onSuccess: async () => {
        await getVendorsTableAction();
        await getVendorsAction();
      },
    },
  );

  return { changeVendorStatusAction, isLoading };
}
