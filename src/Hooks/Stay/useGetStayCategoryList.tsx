import { getStayCategoryList } from 'Services/Stay';
import { StayCategories, StayCategoryResult } from 'Types/Stay';
import { useQuery } from 'react-query';

export default function useGetStayCategoryList() {
  const { data, error, isLoading } = useQuery<StayCategoryResult, Error>({
    queryKey: 'getStayCategoryList',
    queryFn: () => getStayCategoryList(),
    onSuccess: () => {},
  });

  return {
    stayPropertyListData: data?.data as StayCategories[],
    error,
    isLoading,
  };
}
