import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { postAddToCard } from "@/services/book";
import { AddToCartResultI } from "@/types/flight";
import { useMutation } from "@tanstack/react-query";

export default function usePostAddToCard({
  onSuccess,
}: {
  onSuccess: ({ invoiceCode }: { invoiceCode: string }) => void;
}) {
  const { mutate, isPending, data } = useMutation({
    mutationFn: postAddToCard,
    onSuccess: ({ invoiceCode }) => {
      if (onSuccess) onSuccess({ invoiceCode });
      toast.success("success");
    },
    onError(err: AxiosError<unknown, any>) {
      const error = err;
      toast.error(error.message);
    },
  });

  return {
    postAddToCardAction: mutate,
    postAddToCardLoading: isPending,
    addToCardData: data as AddToCartResultI,
  };
}
