import { getHotelPropertyList } from 'Services/Stay';
import { StayPropertyResult } from 'Types/Stay';
import { useQuery } from 'react-query';

interface GetHotelPropertyList {
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export default function useGetHotelPropertyList({
  setActiveTabIndex,
}: GetHotelPropertyList) {
  const { data, error, isLoading, refetch } = useQuery<
    StayPropertyResult,
    Error
  >({
    queryKey: 'stayPropertyList',
    queryFn: () => getHotelPropertyList(),
    onSuccess: () => {
      if (setActiveTabIndex) setActiveTabIndex((pre) => pre + 1);
    },
  });

  return {
    stayPropertyListData: data?.data,
    getStayPropertyListDataAction: refetch,
    error,
    isLoading,
  };
}
