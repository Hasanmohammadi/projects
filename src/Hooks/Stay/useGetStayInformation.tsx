import { getStayInformation } from 'Services/Stay';
import { StayInformationResultI } from 'Types/Stay';
import { useQuery } from 'react-query';

interface GetStayInformationArgsI {
  hotelId: string;
  VendorId: string;
}

export default function useGetStayInformation({
  hotelId,
  VendorId,
}: GetStayInformationArgsI) {
  const {
    data: stayInformationData,
    error,
    isLoading,
    refetch: getStayInformationAction,
  } = useQuery<StayInformationResultI, Error>({
    queryKey: 'getStaysInformation',
    queryFn: () => getStayInformation({ hotelId, VendorId }),
    cacheTime: 0,
    enabled: hotelId?.length > 23,
  });

  return {
    stayInformationData: stayInformationData || null,
    error,
    isLoading,
    getStayInformationAction,
  };
}
