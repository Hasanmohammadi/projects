import { getCurrencyList } from 'Services/Market';
import { CurrencyListI } from 'Types/Market';
import { useQuery } from 'react-query';

export default function useGetCurrencyList() {
  const { data, error, isLoading } = useQuery<CurrencyListI, Error>({
    queryKey: 'currencyList',
    queryFn: () => getCurrencyList(),
  });

  return {
    currencyListData: data?.data,
    error,
    currencyListLoading: isLoading,
    totalRowCount: data?.totalRowCount,
  };
}
