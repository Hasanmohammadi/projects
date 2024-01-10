import { useFlightSearchResultContext } from "@/context";
import { queryClient } from "@/providers/ReactQueryProvider";
import { postCreateSearch } from "@/services/search";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

export interface UsePostCreateSearchArgsI {
  onSuccess?: (searchId: string) => void;
}

export default function usePostCreateSearch({
  onSuccess,
}: UsePostCreateSearchArgsI) {
  const { setSearchResultLoading } = useFlightSearchResultContext();
  const { mutate, isPending, data } = useMutation({
    mutationFn: postCreateSearch,
    mutationKey: ["searchResult"],
    onSuccess: (newData) => {
      queryClient.setQueryData(["searchResult"], newData);
      if (onSuccess) onSuccess(newData.searchId);
    },
    onError(err: AxiosError<unknown, any>) {
      const error = err;
      toast.error(error.message);
    },
  });

  useEffect(() => {
    setSearchResultLoading(isPending);
  }, [isPending]);

  return {
    postCreateSearchAction: mutate,
    postCreateSearchLoading: isPending,
    createSearchData: data,
  };
}
