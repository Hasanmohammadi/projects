import { getVendors } from 'Services/Vendors';
import { VendorsI } from 'Types/Vendors';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface GetVendorsI {
  vendorName?: string;
}

export default function useGetVendorsTable({ vendorName }: GetVendorsI) {
  const [searchParams] = useSearchParams();
  const [pageSize] = useState(6);

  const {
    data: vendorsTableData,
    isLoading,
    refetch,
    error,
  } = useQuery<VendorsI, Error>({
    queryKey: 'vendorsTable',
    queryFn: () =>
      getVendors({
        page: Number(searchParams.get('page')),
        pageSize,
        vendorName: vendorName || (searchParams.get('search') as string),
      }),

    enabled: false,
  });

  useEffect(() => {
    refetch().catch((err) => {
      console.log('refetch error', err);
    });
  }, [refetch, searchParams.get('page'), pageSize, vendorName]);

  return {
    vendorsTableData,
    isLoading,
    pageSize,
    error,
    getVendorsTableAction: refetch,
  };
}
