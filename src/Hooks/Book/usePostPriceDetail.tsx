import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PostPriceDetailsResultI } from "@/types/search";
import { postPriceDetails } from "@/services/book";

export default function usePostPriceDetail() {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postPriceDetails,
    onSuccess: () => {},
    onError(err) {
      const error = err as AxiosError;
      toast.error(error.message);
    },
  });

  return {
    postPriceDetailsAction: mutate,
    postPriceDetailsLoading: isPending,
    priceDetailsData: data as PostPriceDetailsResultI,
  };
}
