import { getStaysList } from 'Services/Stay';
import { StaysListResultI } from 'Types/Stay';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

interface GetStaysListArgsI {
  vendorId?: string;
  stayName?: string;
  filterTypeId?: string;
  pageSize: number;
  isActive?: boolean;
  enabled?: boolean;
}

export default function useGetStaysList({
  vendorId,
  filterTypeId,
  stayName,
  pageSize,
  isActive,
  enabled,
}: GetStaysListArgsI) {
  const [searchParams] = useSearchParams();

  const { data, error, isLoading, refetch, isFetching } = useQuery<
    StaysListResultI,
    Error
  >({
    queryKey: 'getStaysList',
    queryFn: () =>
      getStaysList({
        vendorId,
        stayName,
        pageSize,
        page: Number(searchParams.get('page')),
        isActive,
        filterTypeId,
      }),
    cacheTime: 0,
    enabled,
  });

  useEffect(() => {
    refetch().catch((err) => console.log(err));
  }, [searchParams.get('page'), searchParams.get('search'), filterTypeId]);

  return {
    staysListData: data as StaysListResultI,
    error,
    isLoading: isFetching || isLoading,
    getStayListAction: refetch,
  };
}
