import { useEffect } from "react";

import { getPlaces } from "@/services/basicInformation";
import { PlacesI } from "@/types/basicInformation";
import { useQuery } from "@tanstack/react-query";

interface GetPlacesArgsI {
  name: string;
  count: number;
  place?: string;
}

export default function useGetAirports({ name, count, place }: GetPlacesArgsI) {
  const { data, isFetching, refetch } = useQuery<PlacesI[]>({
    queryKey: ["airports", { place }],
    queryFn: () =>
      getPlaces({
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
    getPlacesData: data as PlacesI[],
    placesLoading: isFetching,
    getPlacesAction: refetch,
  };
}
