import { getStayType } from 'Services/Stay';
import { useQuery } from 'react-query';

export default function useGetStayTypeList() {
  const {
    data: stayTypeList,
    error,
    isLoading,
  } = useQuery({
    queryKey: 'stayType',
    queryFn: () => getStayType(),
  });

  return {
    stayTypeList,
    error,
    isLoading,
  };
}
