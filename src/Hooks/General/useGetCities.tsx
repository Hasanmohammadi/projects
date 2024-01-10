import { getCities } from 'Services/General';
import { CitiesI } from 'Types/General';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

export default function useGetCities({
  countryId,
  cityName,
  enabled = true,
}: {
  countryId: string;
  cityName?: string;
  enabled?: boolean;
}) {
  const { data, error, isLoading, refetch } = useQuery<CitiesI, Error>({
    queryKey: 'cities',
    queryFn: () => getCities({ countryId, cityName }),
    enabled: countryId?.length > 23 && enabled,
    cacheTime: 0,
  });

  useEffect(() => {
    if (countryId?.length > 23 && enabled) {
      refetch().catch((err) => {
        console.log('refetch error', err);
      });
    }
  }, [countryId, refetch, cityName, enabled]);

  return {
    citiesData: data?.cities,
    error,
    citiesLoading: isLoading,
  };
}
