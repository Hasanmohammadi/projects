import { getCountries } from 'Services/General';
import { CountriesI } from 'Types/General';
import { useQuery } from 'react-query';

export default function useGetCountries() {
  const { data, error, isLoading } = useQuery<CountriesI, Error>({
    queryKey: 'countries',
    queryFn: () => getCountries(),
  });

  return {
    countriesData: data?.data,
    error,
    countryLoading: isLoading,
    totalRowCount: data?.totalRowCount,
  };
}
