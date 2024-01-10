import { useEffect } from "react";

import { getCountry } from "@/services/basicInformation";
import { CountryI } from "@/types/basicInformation";
import { useQuery } from "@tanstack/react-query";

interface GetCountryArgsI {
  name: string;
  count: number;
  form?: string;
}

export default function useGetCountry({ name, count, form }: GetCountryArgsI) {
  const { data, isFetching, refetch } = useQuery<CountryI[]>({
    queryKey: ["country", { form }],
    queryFn: () =>
      getCountry({
        count,
        name,
      }),
    enabled: false,
  });

  useEffect(() => {
    if (name?.length > 0) {
      setTimeout(() => {
        refetch().catch((err) => console.log(err));
      }, 1000);
    }
  }, [name]);

  return {
    getCountriesData: data as CountryI[],
    countriesLoading: isFetching,
    getCountriesAction: refetch,
  };
}
