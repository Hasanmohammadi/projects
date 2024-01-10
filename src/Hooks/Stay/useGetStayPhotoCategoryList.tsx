import { getStayPhotoCategoryList } from 'Services/Stay';
import { StayPhotoCategoriesI } from 'Types/Stay/stay';
import { useQuery } from 'react-query';

export default function useGetStayPhotoCategoryList() {
  const {
    data: stayPhotoCategoryListData,
    error,
    isLoading,
  } = useQuery<StayPhotoCategoriesI[], Error>({
    queryKey: 'stayPhotoCategoryList',
    queryFn: () => getStayPhotoCategoryList(),
  });

  return {
    stayPhotoCategoryListData,
    error,
    isLoading,
  };
}
