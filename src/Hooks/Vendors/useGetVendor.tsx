import { getVendor } from 'Services/Vendors';
import { VendorInfoI } from 'Types/Vendors';
import { useQuery } from 'react-query';
import { Params } from 'react-router-dom';

interface UseGetVendorArgs {
  id: string | Readonly<Params<string>>;
}

export default function useGetVendor({ id }: UseGetVendorArgs) {
  const {
    data: vendorData,
    isLoading,
    refetch,
  } = useQuery<VendorInfoI, Error>('vendor', () => getVendor({ id }), {
    cacheTime: 0,
  });

  return {
    vendorData,
    isLoading,
    getVendorAction: refetch,
  };
}
