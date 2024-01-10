import { getLanguage } from 'Services/General';
import { LanguageI } from 'Types/General';
import { useQuery } from 'react-query';

export default function useGetLanguages() {
  const { data: getLanguagesData, isLoading } = useQuery<
    LanguageI[],
    Error
  >('getLanguages', getLanguage);

  return {
    getLanguagesData,
    isLoading,
  };
}
