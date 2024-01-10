import { getVendors } from 'Services/Vendors';
import { VendorsI } from 'Types/Vendors';
import { useQuery } from 'react-query';

export default function useGetVendors() {
  const {
    data: vendorsData,
    isLoading,
    refetch,
    error,
  } = useQuery<VendorsI, Error>({
    queryKey: 'vendors',
    queryFn: () =>
      getVendors({
        page: 1,
        pageSize: 1000,
      }),
  });

  return {
    vendorsData,
    isLoading,
    error,
    getVendorsAction: refetch,
  };
}
