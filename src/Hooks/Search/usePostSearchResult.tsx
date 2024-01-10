import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { convertApiToFrontData } from "@/helpers/places";
import { postSearchResult } from "@/services/search";
import {
  FrontDataSearchResultI,
  GetSearchResultResultI,
  OpratorDetailI,
} from "@/types/search";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFlightSearchResultContext } from "@/context";

export default function usePostSearchResult({
  onSuccess,
}: {
  onSuccess?: (
    newData: FrontDataSearchResultI,
    opratorDetails: OpratorDetailI[]
  ) => void;
}) {
  const { setSearchResultLoading } = useFlightSearchResultContext();
  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: postSearchResult,
    onSuccess: (newData) => {
      if (onSuccess)
        onSuccess(
          convertApiToFrontData(newData as GetSearchResultResultI),
          newData.searchResult.opratorDetails
        );
    },
    onError(err: AxiosError<unknown, any>) {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  useEffect(() => {
    setSearchResultLoading(isPending);
  }, [isPending]);

  return {
    postSearchResultAction: mutate,
    postSearchResultLoading: isPending,
    searchResultData: convertApiToFrontData(data as GetSearchResultResultI),
    searchResultIsError: isError,
  };
}
